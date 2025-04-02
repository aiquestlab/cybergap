Billing & Account Management Portal in Flask

Overview:

Develop a Flask-based web application that provides a billing and account management portal. This portal will allow new customers to register using Google SSO, automatically designate the new user as the default billing admin, and, after authentication, direct them to a dashboard where they can manage billing-related features. The solution should adhere to industry best practices in security, modular design, and maintainability.

Detailed Requirements:

User Authentication and Registration:

Google Single Sign-On (SSO):
Integrate Google OAuth2 for user authentication.
New customers should be able to sign up/login using their Google account.
After a successful signup via Google SSO, automatically assign the user the role of “Billing Admin.”
Session Management & Security:
Use secure session management practices (e.g., Flask-Login) and CSRF protection.
Store any sensitive credentials (e.g., OAuth client secret) in environment variables.
Post-Login Flow:

Upon successful authentication, redirect users to a dashboard page.
Ensure that the dashboard is only accessible to authenticated users.
Dashboard Features (Accessible by Billing Admin):

Billing Details Management:
Provide functionality for the billing admin to add, update, or remove billing details (e.g., billing address, contact information).
Payment Method Management:
Allow the billing admin to add or remove payment methods (e.g., credit cards, bank accounts).
(Integrate with Stripe payment gateway API for tokenization of payment details.)
Invoice Management:
Display a list of due invoices with details such as amount, due date, etc.
Allow the billing admin to view invoice details and process payments for due invoices.
Plan Subscription Management:
Enable the billing admin to add, upgrade, or cancel plan subscriptions.
Support at least three plan tiers: Basic, Advanced, and Enterprise.
Provide logic to handle plan transitions (e.g., prorated charges, cancellation fees).
Billing Users Management:
Allow the billing admin to add or remove other billing users.
Implement user role management so that billing users have defined permissions.
Architecture and Code Organization:

Use Flask Blueprints to structure the application into modular components (e.g., authentication, dashboard, billing management).
Include configuration management that loads environment-specific settings (e.g., development, production).
Write unit tests and integration tests for key functionalities (authentication, billing operations, etc.).
Additional Best Practices & Enhancements:

Error Handling & Logging:
Implement robust error handling and logging mechanisms.
Responsive UI:
Ensure the dashboard has a clean, responsive UI (you may use a front-end framework like Bootstrap).
API Endpoints:
Optionally, expose RESTful API endpoints for billing operations, secured by appropriate authentication mechanisms (e.g., JWT tokens) for future integrations.
Documentation:
Provide clear documentation for the codebase, API endpoints, and setup instructions.
Security Considerations:
Follow secure coding practices such as input validation, secure storage of credentials, and regular dependency updates.
Deliverables:

A fully functional Flask application meeting the above requirements.
A README file detailing setup, configuration (including environment variables), and instructions on how to run the application.
Test cases covering critical features.
Inline code documentation and comments explaining key sections.