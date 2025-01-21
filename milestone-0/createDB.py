import sqlite3

conn = sqlite3.connect('sqlTest.db')
cursor = conn.cursor()

deleteQuery = "DROP TABLE IF EXISTS TESTDB"
cursor.execute(deleteQuery)

createQuery = """ CREATE TABLE TESTDB (
                    name VARCHAR(255) NOT NULL,
                    age INT NOT NULL,
                    dob DATE NOT NULL,
                    email VARCHAR(255)
                );
              """
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

cursor.execute(createQuery)
cursor.execute(insertQuery1)
cursor.execute(insertQuery2)

conn.commit()

# Close the cursor
cursor.close()
conn.close()