from flask import Blueprint, jsonify, request
from . import db, helpers

players_bp = Blueprint("players", __name__, url_prefix="/api")

@players_bp.route(
    "/players-table", methods=["GET"]
)
def playersTable():
        # possible variables to use in the query. Change these to get different results
        # set to "" to remove from query
        playerSearch = request.args.get("players")
        posFilter = request.args.get("position")
        orderByCol = request.args.get("column")
        direction = request.args.get("dir") 
        
        database = db.get_db()

        queryLine1 = "select name, team, age, pos, g, fg, threept, ft, trb, ast, stl, blk, tov, pts, fantasy, creator from players as p"
        queryLine2 = f"where name like '%{playerSearch}%'"
        queryLine3 = f"and p.pos = '{posFilter}'"
        queryLine4 = f"order by {orderByCol if orderByCol != '' else 'fantasy'} {direction if direction in ['asc', 'desc', 'ASC', 'DESC'] else 'desc'}"

        query = [queryLine1, queryLine2]
        if posFilter != "":
            query.append(queryLine3)
        query.append(queryLine4)

        query = "\n".join(query)
        cur = database.execute(query)
        players = helpers.serialize_output(cur)
        return jsonify({"success": True, "players":players})

@players_bp.route(
      "/all-players", methods=["GET"]
)
def playersList():
    database = db.get_db()

    query = "SELECT pid, name, creator FROM players"
    cur = database.execute(query)

    out = []
    for row in cur.fetchall():
        pid = row[0]
        name = row[1]
        creator = row[2]
        out.append({"id": pid, "label": f"{name} ({creator if creator else "NBA"}-{pid})"})

    return jsonify({"success": True, "players":out})