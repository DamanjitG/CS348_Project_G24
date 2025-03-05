# Milestone 2 Setup


You will need Python installed in order to run the code for milestone 2.

To begin, in the root directory, run

`pip install -r requirements.txt`

## Backend & Database

First, change your current directory to the backend folder within milestone-2.

`cd backend`
 
This is where you run all the commands for the server.

To create and populate the database, run

`flask --app server init-db`

Then, to start the server, run

`flask --app server run`

The console output will tell you the port the server is running on.