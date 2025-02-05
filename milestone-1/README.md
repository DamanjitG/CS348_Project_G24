# Milestone 1 Setup


You will need Python installed in order to run the code for milestone 1.


First, make sure your current directory is the milestone-1 folder, not the root of the repository. Run

 `pip install -r requirements.txt` 
 
 to install the required libraries. If this doesn't work however, simply manually install Numpy and Pandas.

 To create the database, you want to run 

 `python createDB.py`

 This will create an `sqlTest.db` file which contains the database. You can then run

 `python queryDB.py`

 to execute some quick sample queries and see the results. The first query selects all user data, the second query selects name, position and team for players under the age of 25, and the third query selects the maximum age of any player.

As an additional convenience, you can run `runSQL.py xyz.sql` to execute the query in xyz.sql and show the results. You can try this out with `runSQL.py lebronTest.sql`. Note however that *this only works if there is a single query in the sql file, and does NOT work if the .sql file contains multiple queries.*
 