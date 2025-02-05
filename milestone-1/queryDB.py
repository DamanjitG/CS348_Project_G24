import sqlite3

conn = sqlite3.connect('sqlTest.db')
cursor = conn.cursor()

query1 = """ SELECT * FROM users; """
query2 = """ SELECT name, pos, team FROM players WHERE age < 25; """
query3 = """ SELECT MAX(age) FROM players """

# should return both rows
query1Output = cursor.execute(query1).fetchall()
print(f"Query 1 returned {len(query1Output)} rows")
for outputRow in query1Output:
    print(outputRow)

# should return one row
query2Output = cursor.execute(query2).fetchall()
print(f"Query 2 returned {len(query2Output)} row")
for outputRow in query2Output:
    print(outputRow)

# should return one row
query3Output = cursor.execute(query3).fetchall()
print(f"Query 3 returned {len(query3Output)} row")
for outputRow in query3Output:
    print(outputRow[0])

# Close the cursor
cursor.close()
conn.close()