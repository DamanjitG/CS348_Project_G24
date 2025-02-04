import sqlite3

conn = sqlite3.connect('m1.db')
cursor = conn.cursor()

deleteQuery = "DROP TABLE IF EXISTS TESTDB"
cursor.execute(deleteQuery)

createTestDB = """ CREATE TABLE TESTDB (
                    name VARCHAR(255) NOT NULL,
                    age INT NOT NULL,
                    dob DATE NOT NULL,
                    email VARCHAR(255)
                );
              """
# Create Test-DB (M0)
cursor.execute(createTestDB)

# Insert Values into Test-DB 
insertQuery1 = """ INSERT INTO TESTDB VALUES(
                    'Alice Andrews',
                    25,
                    '2000-01-01',
                    'alice.andrews@test.com'
                );
               """
insertQuery2 = """ INSERT INTO TESTDB VALUES(
                    'Bobby Bell',
                    37,
                    '1997-09-07',
                    'bobby.bell@test.org'
                );
               """

cursor.execute(insertQuery1)
cursor.execute(insertQuery2)

cursor.execute("DROP TABLE IF EXISTS Users")
createUsersTable = """ CREATE TABLE Users (
                        uid INTEGER PRIMARY KEY AUTOINCREMENT,
                        username VARCHAR(20) UNIQUE NOT NULL,
                        password VARCHAR(20) NOT NULL
                );
            """
cursor.execute(createUsersTable)

# No uid is provided as it will automatically be assigned UNIQUE values
insertUsers = """
        INSERT INTO Users (username, password) VALUES
        ('user1', 'user1pass'),
        ('user2', 'user2pass'); 
"""

cursor.execute(insertUsers)

conn.commit()

# Close the cursor
cursor.close()
conn.close()