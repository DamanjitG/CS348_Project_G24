from flask import Blueprint, jsonify, request
from . import db, helpers

suggested_bp = Blueprint("suggested", __name__, url_prefix="/api")

@suggested_bp.route(
    "/suggested/<string:username>", methods=["GET"]
)
def get_suggested(username):
        # possible variables to use in the query. Change these to get different results
        # set to "" to remove from query
        # playerSearch = request.args.get("players")
        # posFilter = request.args.get("position")
        # orderByCol = request.args.get("column")
        # direction = request.args.get("dir") 
        
        database = db.get_db()
        print(username)

        query = f"""
WITH RECURSIVE og AS (
SELECT username, pid FROM watchlist WHERE username = ?
),
Rec AS (
SELECT 1 AS depth, username, pid FROM og
UNION
SELECT Rec.depth + 1, Rec.username, w3.pid
FROM Rec INNER JOIN watchlist w2 ON Rec.pid = w2.pid 
	INNER JOIN watchlist w3 ON w2.username = w3.username
WHERE Rec.depth <= 10
)
SELECT p.pid, name, creator, fantasy, MIN(depth), team
FROM players p INNER JOIN Rec ON p.pid = Rec.pid
WHERE p.pid NOT IN ( SELECT pid FROM og )
GROUP BY p.pid
ORDER BY depth ASC, fantasy DESC;
"""

        # query = [queryLine1, queryLine2]
        # if posFilter != "":
        #     query.append(queryLine3)
        # query.append(queryLine4)

        out = []
        cur = database.execute(query, [username])
        for row in cur.fetchall():
            pid = row[0]
            name = row[1]
            creator = row[2]
            fantasy = row[3]
            depth = row[4]
            team = row[5]
            thecreator = creator if creator else "NBA"
            out.append({"id": pid, "label": f"{name} ({thecreator})", 
                        "name":name, "fantasy":fantasy, "depth":depth, "team":team})

        return jsonify({"success": True, "players":out})

# @suggested_bp.route(
#       "/the-players", methods=["GET"]
# )
# def playersList():
#     database = db.get_db()

#     query = "SELECT pid, name, creator FROM players"
#     cur = database.execute(query)

#     out = []
#     for row in cur.fetchall():
#         pid = row[0]
#         name = row[1]
#         creator = row[2]
#         out.append({"id": pid, "label": f"{name} ({creator if creator else "NBA"}-{pid})"})

#     return jsonify({"success": True, "players":out})