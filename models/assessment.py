from extensions import db
from datetime import datetime

class Assessment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(128), db.ForeignKey('user.id'), nullable=False)
    level = db.Column(db.Integer, nullable=False)  # 1 or 2 for CMMC Level
    assets = db.Column(db.JSON, default=[])
    
    # For Level 1 (17 controls)
    # Structure: [{"id": "AC.L1-3.1.1", "status": "Met", "notes": "..."}, ...]
    level1_controls = db.Column(db.JSON, default=[])
    
    # For Level 2 (320 controls)
    # Structure: [{"nistId": "3.1.1", "cmmcId": "AC.L2-3.1.1", 
    #             "assessmentCriteria": [{"id": "3.1.1[a]", "status": "Met", "notes": "..."}]}]
    level2_controls = db.Column(db.JSON, default=[])
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'level': self.level,
            'assets': self.assets,
            'controls': self.level1_controls if self.level == 1 else self.level2_controls,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }

