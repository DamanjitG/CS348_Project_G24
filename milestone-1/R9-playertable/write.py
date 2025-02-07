import sqlite3

conn = sqlite3.connect('../m1.db')
cursor = conn.cursor()

query1 = """
select name, team, age, pos, g, mp, fg, threept, ft, trb, ast, stl, blk, tov, pts, (pts + trb + ast + stl + blk - tov) as fantasy from players as p
where p.pos = 'PG'
and name like '%Don%'
order by fantasy desc;
"""

query2 = """
select name, team, age, pos, g, mp, fg, threept, ft, trb, ast, stl, blk, tov, pts, (pts + trb + ast + stl + blk - tov) as fantasy from players as p
where p.pos = 'PG'
and name like '%Don%'
order by tov asc;
"""

query3 = """
select name, team, age, pos, g, mp, fg, threept, ft, trb, ast, stl, blk, tov, pts, (pts + trb + ast + stl + blk - tov) as fantasy from players as p
where p.pos = 'C'
and name like '%Nik%'
order by trb desc;
"""

query4 ="""
select name, team, age, pos, g, mp, fg, threept, ft, trb, ast, stl, blk, tov, pts, (pts + trb + ast + stl + blk - tov) as fantasy from players as p
where p.pos = 'PF'
and name like '%%'
order by ast desc;
"""

outputFile = open('./select_players.out', 'w', encoding="utf-8")
outputFile.write("Player Table View Sample Output \n")
queries = [query1, query2, query3, query4]

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