import sqlite3

query1 = """
SELECT name AS top_players, COUNT(DISTINCT(username)) AS total_watchers
FROM players NATURAL LEFT OUTER JOIN watchlist
GROUP BY pid
ORDER BY total_watchers DESC
LIMIT 10;
"""

query2 = """
SELECT name AS top_players, COUNT(DISTINCT(username)) AS total_watchers
FROM players NATURAL LEFT OUTER JOIN watchlist
WHERE pos = 'PG'
GROUP BY pid
ORDER BY total_watchers DESC
LIMIT 10;
"""

conn = sqlite3.connect('../SAMPLEDB.sqlite')
cursor = conn.cursor()

outputFile = open('./sample.out', 'w', encoding="utf-8")
outputFile.write("Most Watched Players Sample Output \n")
queries = [query1, query2]

for i, query in enumerate(queries):
    query1Output = cursor.execute(query).fetchall()
    columnNames = [description[0] for description in cursor.description]
    outputFile.write(f"Query {i + 1} returned {len(query1Output)} row(s)\n")
    outputFile.write(', '.join(columnNames))
    outputFile.write('\n') 
    for outputRow in query1Output:
        outputFile.write(" ".join(str(colVal) for colVal in outputRow))
        outputFile.write("\n")
    outputFile.write('\n')

outputFile.close()
cursor.close()
conn.close()

conn = sqlite3.connect('../PRODUCTIONDB.sqlite')
cursor = conn.cursor()

outputFile = open('./production.out', 'w', encoding="utf-8")
outputFile.write("Most Watched Players Production Output \n")
queries = [query1,query2]

for i, query in enumerate(queries):
    query1Output = cursor.execute(query).fetchall()
    columnNames = [description[0] for description in cursor.description]
    outputFile.write(f"Query {i + 1} returned {len(query1Output)} row(s)\n")
    outputFile.write(', '.join(columnNames))
    outputFile.write('\n') 
    for outputRow in query1Output:
        outputFile.write(" ".join(str(colVal) for colVal in outputRow))
        outputFile.write("\n")
    outputFile.write('\n')

outputFile.close()
cursor.close()
conn.close()