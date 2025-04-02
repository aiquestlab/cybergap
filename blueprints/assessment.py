from flask import Blueprint, jsonify, request, render_template, current_app
from flask_login import login_required, current_user
from models.assessment import Assessment
from extensions import db
from datetime import datetime

assessment_bp = Blueprint('assessment', __name__, url_prefix='/assessment')

@assessment_bp.route('/level1')
@login_required
def level1():
    # Corrected path: 'assessment/' instead of 'gap_assessment/'
    return render_template('assessment/indexl1.html')

@assessment_bp.route('/level2')
@login_required
def level2():
    # Corrected path: 'assessment/' instead of 'gap_assessment/'
    return render_template('assessment/indexl2.html')

@assessment_bp.route('/api/save', methods=['POST'])
@login_required
def save_assessment():
    data = request.json
    level = data.get('level')
    assets = data.get('assets', [])
    controls = data.get('controls', [])

    assessment = Assessment.query.filter_by(
        user_id=current_user.id,
        level=level
    ).first()

    if not assessment:
        assessment = Assessment(
            user_id=current_user.id,
            level=level
        )

    assessment.assets = assets
    if level == 1:
        assessment.level1_controls = controls
    else:
        assessment.level2_controls = controls
    
    db.session.add(assessment)
    db.session.commit()

    return jsonify(assessment.to_dict())

@assessment_bp.route('/api/load/<int:level>')
@login_required
def load_assessment(level):
    assessment = Assessment.query.filter_by(
        user_id=current_user.id,
        level=level
    ).first()

    if not assessment:
        return jsonify({
            'assets': [],
            'controls': []
        })

    return jsonify(assessment.to_dict())

@assessment_bp.route('/api/scoping/<int:level>', methods=['POST'])
@login_required
def save_scoping():
    """Save scoping information separately"""
    try:
        data = request.get_json()
        level = data.get('level')
        assets = data.get('assets', [])
        
        assessment = Assessment.query.filter_by(
            user_id=current_user.id,
            level=level
        ).first()
        
        if not assessment:
            assessment = Assessment(
                user_id=current_user.id,
                level=level,
                assets=assets
            )
        else:
            assessment.assets = assets
            
        db.session.add(assessment)
        db.session.commit()
        
        return jsonify({
            'status': 'success',
            'message': 'Scoping information saved successfully',
            'assets': assets
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

@assessment_bp.route('/api/sprs/<int:level>')
@login_required
def calculate_sprs(level):
    """Calculate SPRS score based on assessment data"""
    try:
        assessment = Assessment.query.filter_by(
            user_id=current_user.id,
            level=level
        ).first()
        
        if not assessment:
            return jsonify({
                'status': 'error',
                'message': 'No assessment data found'
            }), 404
            
        controls = assessment.level1_controls if level == 1 else assessment.level2_controls
        
        # Start with perfect score
        score = 110
        
        # Calculate deductions based on gaps
        for control in controls:
            if isinstance(control, dict):  # Ensure control is a dictionary
                # For Level 1
                if level == 1:
                    if control.get('status') == 'Gap':
                        score -= 5  # Default deduction for Level 1
                # For Level 2
                else:
                    # Check assessment criteria
                    criteria = control.get('assessmentCriteria', [])
                    has_gap = any(c.get('status') == 'Gap' for c in criteria)
                    if has_gap:
                        deduction = control.get('deduction', -5)  # Default to -5 if not specified
                        score += deduction  # Add negative deduction
        
        # Score cannot go below -203 per DoD Assessment Methodology
        score = max(score, -203)
        
        return jsonify({
            'status': 'success',
            'score': score,
            'timestamp': datetime.utcnow().isoformat()
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

@assessment_bp.route('/api/generate-report', methods=['POST'])
@login_required
def generate_report():
    """Generate comprehensive assessment report"""
    try:
        data = request.get_json()
        level = data.get('level')
        
        assessment = Assessment.query.filter_by(
            user_id=current_user.id,
            level=level
        ).first()
        
        if not assessment:
            return jsonify({
                'status': 'error',
                'message': 'No assessment data found'
            }), 404
            
        # Get assessment data
        assets = assessment.assets
        controls = assessment.level1_controls if level == 1 else assessment.level2_controls
        
        # Calculate statistics
        total_controls = len(controls)
        met_controls = sum(1 for c in controls if c.get('status') == 'Met') if level == 1 else \
                      sum(1 for c in controls if all(ac.get('status') == 'Met' for ac in c.get('assessmentCriteria', [])))
        gap_controls = sum(1 for c in controls if c.get('status') == 'Gap') if level == 1 else \
                      sum(1 for c in controls if any(ac.get('status') == 'Gap' for ac in c.get('assessmentCriteria', [])))
        
        # Calculate SPRS score
        score = 110
        for control in controls:
            if level == 1:
                if control.get('status') == 'Gap':
                    score -= 5
            else:
                if any(ac.get('status') == 'Gap' for ac in control.get('assessmentCriteria', [])):
                    deduction = control.get('deduction', -5)
                    score += deduction
        
        score = max(score, -203)  # Apply minimum score limit
        
        report = {
            'summary': {
                'level': level,
                'total_controls': total_controls,
                'met_controls': met_controls,
                'gap_controls': gap_controls,
                'sprs_score': score,
                'completion_percentage': round((met_controls + gap_controls) / total_controls * 100 if total_controls > 0 else 0, 1)
            },
            'assets': {
                'total': len(assets),
                'in_scope': sum(1 for a in assets if a.get('inScope', False)),
                'details': assets
            },
            'controls': controls,
            'generated_at': datetime.utcnow().isoformat()
        }
        
        return jsonify({
            'status': 'success',
            'report': report
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

@assessment_bp.route('/api/sprs-report/<int:level>')
@login_required
def generate_sprs_report(level):
    """Generate SPRS-specific report with scoring details"""
    try:
        assessment = Assessment.query.filter_by(
            user_id=current_user.id,
            level=level
        ).first()
        
        if not assessment:
            return jsonify({
                'status': 'error',
                'message': 'No assessment data found'
            }), 404
            
        controls = assessment.level1_controls if level == 1 else assessment.level2_controls
        
        # Calculate SPRS score and collect deduction details
        score = 110
        deductions = []
        
        for control in controls:
            if level == 1:
                if control.get('status') == 'Gap':
                    deductions.append({
                        'control_id': control.get('id'),
                        'deduction': -5,
                        'reason': 'Control Gap'
                    })
                    score -= 5
            else:
                criteria = control.get('assessmentCriteria', [])
                if any(c.get('status') == 'Gap' for c in criteria):
                    deduction = control.get('deduction', -5)
                    deductions.append({
                        'control_id': control.get('cmmcId'),
                        'deduction': deduction,
                        'reason': 'One or more criteria gaps'
                    })
                    score += deduction
        
        score = max(score, -203)
        
        report = {
            'sprs_score': score,
            'assessment_date': datetime.utcnow().isoformat(),
            'level': level,
            'deductions': deductions,
            'score_details': {
                'initial_score': 110,
                'total_deductions': sum(d['deduction'] for d in deductions),
                'final_score': score
            }
        }
        
        return jsonify({
            'status': 'success',
            'report': report
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500
