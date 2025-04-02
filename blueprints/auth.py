from flask import Blueprint, redirect, url_for, flash, render_template, session, request, current_app
from flask_login import login_user, logout_user, login_required, current_user
from authlib.integrations.flask_client import OAuth
from models.user import User
from extensions import db
import os

auth_bp = Blueprint('auth', __name__, url_prefix='/auth')
oauth = OAuth()

def init_oauth(app):
    oauth.init_app(app)
    oauth.register(
        name='google',
        client_id=app.config['GOOGLE_CLIENT_ID'],
        client_secret=app.config['GOOGLE_CLIENT_SECRET'],
        server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
        api_base_url='https://www.googleapis.com/oauth2/v3/',
        userinfo_endpoint='https://openidconnect.googleapis.com/v1/userinfo',
        client_kwargs={
            'scope': 'openid email profile'
        }
    )

@auth_bp.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('dashboard.home'))
    
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        
        user = User.query.filter_by(email=email).first()
        if user and user.check_password(password):
            login_user(user)
            return redirect(url_for('dashboard.home'))
        else:
            flash('Invalid email or password', 'error')
            
    return render_template('auth/login.html')

@auth_bp.route('/signup', methods=['GET', 'POST'])
def signup():
    if current_user.is_authenticated:
        return redirect(url_for('dashboard.home'))
    
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        name = request.form.get('name', '')
        
        if User.query.filter_by(email=email).first():
            flash('Email already registered', 'error')
            return render_template('auth/signup.html')
        
        user = User(
            email=email,
            name=name,
            is_billing_admin=True
        )
        user.set_password(password)
        
        db.session.add(user)
        db.session.commit()
        
        login_user(user)
        return redirect(url_for('dashboard.home'))
        
    return render_template('auth/signup.html')

@auth_bp.route('/authorize')
def authorize():
    callback_url = url_for('auth.callback', _external=True)
    return oauth.google.authorize_redirect(callback_url)

@auth_bp.route('/callback')
def callback():
    try:
        token = oauth.google.authorize_access_token()
        resp = oauth.google.get('userinfo')
        if not resp.ok:
            raise Exception(f"Failed to get user info: {resp.text}")
            
        user_info = resp.json()
        email = user_info.get('email')
        name = user_info.get('name', '')
        picture_url = user_info.get('picture')
        
        if not email:
            raise Exception("Email not provided by Google")
        
        user = User.query.filter_by(email=email).first()
        
        if not user:
            user = User(
                email=email,
                name=name,
                is_billing_admin=True,
                profile_picture_url=picture_url
            )
            db.session.add(user)
        else:
            user.profile_picture_url = picture_url
            user.name = name
        
        db.session.commit()
        login_user(user)
        return redirect(url_for('dashboard.home'))
            
    except Exception as e:
        flash(f'Failed to authenticate: {str(e)}', 'error')
    
    return redirect(url_for('auth.login'))

@auth_bp.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('auth.login'))

