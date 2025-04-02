from flask import Blueprint, render_template, jsonify, request, redirect, url_for, flash, current_app
from flask_login import login_required, current_user
from functools import wraps
import os
from werkzeug.utils import secure_filename

from extensions import db
from datetime import datetime

superadmin_bp = Blueprint('superadmin', __name__, url_prefix='/superadmin')

def superadmin_required(f):
    """Decorator to ensure user is a superadmin"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not current_user.is_billing_admin:
            flash('You need superadmin privileges to access this page.', 'error')
            return redirect(url_for('dashboard.index'))
        return f(*args, **kwargs)
    return decorated_function

# ===== CMMC Playbook Management =====

@superadmin_bp.route('/')
@login_required
@superadmin_required
def index():
    """List CMMC Tutorials for admin management"""
   
    return render_template('superadmin/playbooks.html')
