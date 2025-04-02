@templates @models @blueprints we so far built this dashboard that allows our customers followings (existing features):

Existing Code Structure and Conventions

*   **Modular Design:** The application is structured using Flask Blueprints.
    *   `auth`: Handles user authentication (login, logout, registration).
    *   `dashboard`:  Provides the main user dashboard.
   

*   **Directory Structure:**

    ```
    /
    ├── app.py          # Main application file
    ├── run.py          # Entry point to run the app
    ├── blueprints/     # Flask Blueprints
    │   ├── auth.py
    │   ├── dashboard.py
    │   
    ├── models/         # Database models
    │   ├── user.py
    │   ├── assessment.py # needs to be created refer templates/gap_assessment/script.js
    │  
   
    ├── templates/      # HTML templates
    │   ├── auth/
    │   ├── dashboard/
    │   └── gap_assessment/
    ├── static/         # Static files (CSS, JavaScript, images)
    ├── extensions.py   # Flask extension initialization
    ├── migrations/     # Alembic migration scripts
    ├── .env            # Environment variables (DO NOT COMMIT)
    ├── requirements.txt # Python dependencies
  
    ```

*   **Naming Conventions:**
    *   Use descriptive names for variables, functions, and classes.
    *   Follow PEP 8 style guidelines for Python code.
    *   Blueprint names should end with `_bp`.
    *   Template files should be placed in appropriate subdirectories within the `templates` directory.


<existing features>
1> New customers can signup using google SSO
2> Select either Level 1 or Level 2 assessment
3> Do Gap Assessment - currently we are saving the assessment data in local storage 
4> Calculate SPRS Score (using js - refer templates/assessment folder script.js)
4> Generate PDF reports of the assessment (Static HTML)

</existing features>





<new desired features>
now we want to implement the following new features & functionalities:

1> Create a model to save the assessment data in database
2> Implement routes to handle CMMC 1 & 2 gap assessment
3> Implement routes to handle CMMC 1 & 2 reports
4> Implement routes to handle CMMC 1 & 2 scoping
5> Implement routes to handle CMMC 1 & 2 SPRS calculator
6> Implement routes to handle CMMC 1 & 2 SPRS reporting
7> Implement routes to handle CMMC 1 & 2 SPRS reporting

<important>
1> If you need further help with this project, feel free to ask first with followup questions
2>Please dont forgot to update the implementation.md file with the new features and changes.
</important>


#Todo List

