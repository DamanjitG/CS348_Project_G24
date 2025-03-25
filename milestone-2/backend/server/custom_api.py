from flask import Blueprint, request, jsonify
from . import db

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
    try:
        connection = db.get_db()
        cursor = connection.cursor()

        addCustomQuery = "INSERT INTO players (name, age, team, pos, g, pts, ast, trb, stl, blk, tov) VALUES (?,?,?,?,?,?,?,?,?,?,?)"
        cursor.execute(addCustomQuery, (cname, age, team, pos, gp, ppg, ast, rpg, spg, bpg, tpg))

        connection.commit()
        cursor.close()

        return jsonify({"success": True, "message": "Custom player has been added successfully"}), 200
    except Exception as e:
        return jsonify({"success": False, "message": "Failed to add custom player to DB"})
