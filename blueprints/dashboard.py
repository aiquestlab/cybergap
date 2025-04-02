from flask import Blueprint, render_template, current_app, request
from flask_login import login_required, current_user
#from .billing import get_or_create_stripe_customer, get_active_subscription
from datetime import datetime
#from models.container_manager import ContainerManager
#from utils.docker_manager import DockerManager

dashboard_bp = Blueprint('dashboard', __name__)

@dashboard_bp.route('/')
#@login_required
def home():         
    return render_template('dashboard/home.html',)

@dashboard_bp.route('/dashboard/profile')
@login_required
def profile():
    return render_template('dashboard/profile.html')

