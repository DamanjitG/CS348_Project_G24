import sqlite3

conn = sqlite3.connect('m1.db')
cursor = conn.cursor()

query1 = """ SELECT * FROM users; """
query2 = """ SELECT name, pos, team FROM players WHERE age < 25 LIMIT 5; """
query3 = """ SELECT MAX(age) FROM players """

print("NOTE: You should have ran createDB.py before executing this script.\n")

# should return both rows
query1Output = cursor.execute(query1).fetchall()
print(f"Query 1 returned {len(query1Output)} row(s))")
for outputRow in query1Output:
    print(outputRow)

# should return one row
query2Output = cursor.execute(query2).fetchall()
print(f"\nQuery 2 returned {len(query2Output)} row(s)")
for outputRow in query2Output:
    print(outputRow)

# should return one row
query3Output = cursor.execute(query3).fetchall()
print(f"\nQuery 3 returned {len(query3Output)} row(s)")
for outputRow in query3Output:
    print(outputRow[0])

# Close the cursor
cursor.close()
conn.close()