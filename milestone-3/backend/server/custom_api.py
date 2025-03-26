from flask import Blueprint, request, jsonify
from . import db, helpers

custom_bp = Blueprint("custom", __name__, url_prefix="/api")


@custom_bp.route("/custom", methods=["POST"])
def add_custom_player():
    data = request.get_json()
    cname = data.get("cname")
    age = data.get("age")
    team = data.get("team")
    pos = data.get("pos")
    gp = data.get("gp")
    ppg = data.get("ppg")
    ast = data.get("ast")
    rpg = data.get("rpg")
    spg = data.get("spg")
    bpg = data.get("bpg")
    tpg = data.get("tpg")
    threept = data.get("threept")
    fg = data.get("fg")
    pf = data.get("pf")
    ft = data.get("ft")
    creator = data.get("username")
    
    try:
        connection = db.get_db()
        cursor = connection.cursor()

        addCustomQuery = "INSERT INTO players (name, age, team, pos, g, pts, ast, trb, stl, blk, tov, threept, fg, pf, ft, creator) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
        cursor.execute(addCustomQuery, (cname, age, team, pos, gp, ppg, ast, rpg, spg, bpg, tpg, threept, fg, pf, ft, creator))

        connection.commit()
        cursor.close()

        return jsonify({"success": True, "message": "Custom player has been added successfully"}), 200
    except Exception as e:
        return jsonify({"success": False, "message": "Failed to add custom player to DB"})


@custom_bp.route("/players/<string:username>", methods=["GET"])

def get_custom_players(username):
    try:
        connection = db.get_db()
        cursor = connection.cursor()

        query = "SELECT * FROM players WHERE creator = ?"

        cursor.execute(query, (username,))
        rows = cursor.fetchall()
        custom_players = [helpers.dict_from_row(row, cursor) for row in rows]
        cursor.close()

        return jsonify({"success": True, "custom_players": custom_players})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)})