import sqlite3

# possible variables to use in the query. Change these to get different results
# set to "" to remove from query
playerSearch = ""
posFilter = "PG"
orderByCol = "trb"

# must set to either "desc" or "asc"
dir = "desc"

conn = sqlite3.connect('m1.db')
cursor = conn.cursor()

queryLine1 = "select name, team, age, pos, g, mp, fg, threept, ft, trb, ast, stl, blk, tov, pts, (pts + trb + ast + stl + blk - tov) as fantasy from players as p"
queryLine2 = f"where name like '%{playerSearch}%'"
queryLine3 = f"and p.pos = '{posFilter}'"
queryLine4 = f"order by {orderByCol if orderByCol != "" else "fantasy"} {dir if dir in ["asc", "desc", "ASC", "DESC"] else 'desc'}"

query = [queryLine1, queryLine2]
if posFilter != "":
    query.append(queryLine3)
query.append(queryLine4)

query = "\n".join(query)
print(query)
queryOutput = cursor.execute(query).fetchall()
columnNames = [description[0] for description in cursor.description]
print(f"Query 1 returned {len(queryOutput)} row(s))")
print(', '.join(columnNames)) 
for outputRow in queryOutput:
    print(outputRow)

cursor.close()
conn.close()

