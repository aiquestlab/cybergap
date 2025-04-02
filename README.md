# CyberComply Billing & Dashboard Application

This application manages billing, subscriptions, and container deployments for the CyberComply GRC platform.

## Features

### Existing Features
- User authentication and authorization
- Dashboard with key metrics
- Container management for customer instances
- User profile management
- Billing information and subscription management

### New Features
- **Modernized Login Page**: Enhanced user experience with a cleaner, more professional design
- **CMMC Playbook**: Access to CMMC tutorials and guides categorized by level and topic
- **Tools & Resources**: Centralized repository for downloading tools, templates, and resources
- **Support Center**: Submit and track support requests directly from the dashboard
- **FAQ Section**: Searchable knowledge base of frequently asked questions
- **Default Environment Variables**: Simplified container setup with pre-configured admin credentials

## Technical Implementation
- Flask web framework with Blueprint architecture
- SQLAlchemy ORM for database operations
- Docker SDK for Python for container management
  - Proper path resolution for Dockerfiles in plan directories
  - Shared network configuration for application and database containers
  - Container statistics and logs monitoring
- Stripe API for payment processing
- Bootstrap for responsive UI

## Getting Started
1. Install dependencies: `pip install -r requirements.txt`
2. Set up environment variables in `.env`
3. Run migrations: `flask db upgrade`
4. Start the application: `python run.py`

## Development
See `development.md` for detailed development guidelines and instructions.
