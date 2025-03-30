from flask import Blueprint, jsonify, request
from . import db, helpers

most_watched_bp = Blueprint("most_watched", __name__, url_prefix="/api")

@most_watched_bp.route(
    "/most-watched", methods=["GET"]
)
def get_top_players():
        # possible variables to use in the query. Change these to get different results
        # set to "" to remove from query
        # playerSearch = request.args.get("players")
        # posFilter = request.args.get("position")
        # orderByCol = request.args.get("column")
        # direction = request.args.get("dir") 
        
        database = db.get_db()

        query = """SELECT pid, name, creator, fantasy, COUNT(DISTINCT(username)) AS total_watchers, team
                FROM players NATURAL LEFT OUTER JOIN watchlist
                GROUP BY pid
                ORDER BY total_watchers DESC, fantasy DESC
                LIMIT 20;"""

        # query = [queryLine1, queryLine2]
        # if posFilter != "":
        #     query.append(queryLine3)
        # query.append(queryLine4)

        out = []
        cur = database.execute(query)
        for row in cur.fetchall():
            pid = row[0]
            name = row[1]
            creator = row[2]
            fantasy = row[3]
            total_watchers = row[4]
            team = row[5]
            thecreator = creator if creator else "NBA"
            out.append({"id": pid, "label": f"{name} ({thecreator})", 
                        "name":name, "fantasy":fantasy, "watchers":total_watchers, "team":team})

        return jsonify({"success": True, "players":out})

# @most_watched_bp.route(
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