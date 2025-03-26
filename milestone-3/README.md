# Folder Layout

Our project submission consists of three folders - backend, frontend, and SQL.

backend contains all of the code relating to creating the production and sample databases and setting up the backend server of the application.

frontend contains all of the code relating to the frontend of the application.

SQL contains all of the SQL queries and testing for our features. Each feature has its own folder, in which you can find the queries, as well as the output with sample and production data. Note that this folder contains two database files, SAMPLEDB.sqlite and PRODUCTIONDB.sqlite. These files represent the version of the database that all the queries were ran against - coming directly from our data.

When running the application, you must generate a fresh production database first - these databases are not for the application itself. Please see below for instructions on setting up the application and database, or to generate your own sample database if desired.

# Milestone 3 Application Setup

You will need Python and npm installed in order to run the code for milestone 3. The backend server is via Python (Flask), and the frontend is via Javascript (React).

## Backend & Production Database

To begin, change your current directory to the backend folder within milestone-3.

`cd backend` if you're already in the milestone-3 folder, or `cd milestone-3/backend` if you're in the root of the repo.

This is where you run all the commands for the server/backend.

First, install the requirements:

`pip install -r requirements.txt`

Then, to create and populate the database, run

`python -m flask --app server init-db`

Then, to start the server, run

`python -m flask --app server run --port=5001`

The console output will tell you the port the server is running on.

## Frontend

Note: for the frontend to work properly, the backend must already be running.

Change your current directory to the frontend folder within milestone-3.

`cd frontend` if you're already in the milestone-3 folder, or `cd milestone-3/frontend` if you're in the root of the repo.

Install the packages with node package manager (npm) and start the development server:

`npm install && npm run start`

The website (interface) will be available locally on http://localhost:3000/.

## Logging In:

To sign in, please use a valid `username:password` combo that is pre-initalized.

Sample Logins (username:password):
- AaronAndrews:password1
- BobbyBrown:password2

You will stay signed in while **clicking between pages**

To logout and login with a different user, **refresh the page via ctrl+r** and you will be prompted back to the login screen

## Sample Database

In order to generate the sample database, navigate to the backend folder

`cd backend`

From there, run

`python server/createSampleDB.py`

to generate the sample database.
