# Folder Layout

Our project submission consists of three folders - backend, frontend, and SQL.

backend contains all of the code relating to creating the production and sample databases and setting up the backend of the application.

frontend contains all of the code relating to the frontend of the application.

SQL contains all of the SQL queries and testing for our features. Each feature has its own folder, in which you can find the queries, as well as the output with sample and production data. Note that this folder contains two database files, SAMPLEDB.sqlite and PRODUCTIONDB.sqlite. These files represent the version of the database that all the queries were ran against - coming directly from our data.

When running the application, you must generate a fresh production database first - these databases are not for the application itself. Please see below for instructions on setting up the application and database, or to generate your own sample database if desired.

# Milestone 2 Application Setup

You will need Python installed in order to run the code for milestone 2.

To begin, in the root directory, run

`pip install -r requirements.txt`

## Backend & Production Database

First, change your current directory to the backend folder within milestone-2.

`cd backend`

This is where you run all the commands for the server.

To create and populate the database, run

`flask --app server init-db`

Then, to start the server, run

`flask --app server run`

The console output will tell you the port the server is running on.

## Sample Database

In order to generate the sample database, navigate to the backend folder

`cd backend`

From there, run

`python server/createSampleDB.py`

to generate the sample database.
