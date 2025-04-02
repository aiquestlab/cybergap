from flask import Flask
from extensions import db, migrate, login_manager
from dotenv import load_dotenv
from datetime import datetime
import os

# Load environment variables 
load_dotenv()

def create_app():
    app = Flask(__name__)
    
    # Configure the app
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-key-change-in-production')
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///assessment.db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    # Server configuration
    app.config['SERVER_NAME'] = 'localhost:5000'
    app.config['APPLICATION_ROOT'] = '/'
    app.config['PREFERRED_URL_SCHEME'] = 'http'
    
    # Google OAuth config
    app.config['GOOGLE_CLIENT_ID'] = os.getenv('GOOGLE_CLIENT_ID')
    app.config['GOOGLE_CLIENT_SECRET'] = os.getenv('GOOGLE_CLIENT_SECRET')

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    login_manager.init_app(app)
    
    # Import all models to ensure they are registered with SQLAlchemy
    from models import User, Assessment
    
    # Add datetime filter
    @app.template_filter('datetime')
    def format_datetime(value):
        if isinstance(value, int):
            value = datetime.fromtimestamp(value)
        return value.strftime('%B %d, %Y %I:%M %p')

    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(int(user_id))
    
    # Register blueprints
    from blueprints.auth import auth_bp, init_oauth
    from blueprints.dashboard import dashboard_bp
    
    from blueprints.superadmin import superadmin_bp
    from blueprints.assessment import assessment_bp

    app.register_blueprint(assessment_bp)
    
    app.register_blueprint(auth_bp)
    app.register_blueprint(dashboard_bp)    
    app.register_blueprint(superadmin_bp)
    
    # Initialize OAuth
    init_oauth(app)

    # Create all tables
    with app.app_context():
        db.create_all()
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, host='localhost', port=5000)

