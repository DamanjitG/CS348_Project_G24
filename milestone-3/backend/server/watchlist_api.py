from flask import Blueprint, request, jsonify
from . import db, helpers

watchlist_bp = Blueprint("watchlist", __name__, url_prefix="/api")

@watchlist_bp.route(
    "/watchlist/<string:username>/<string:watchlist_name>", methods=["GET"]
)
def get_user_watchlist(username, watchlist_name):
    """Get a user's watchlist"""
    try:
        connection = db.get_db()
        cursor = connection.cursor()

        query = """
        SELECT p.pid as player_id, p.name, p.team, p.pos as position, 
               p.pts as points_per_game, p.ast as assists_per_game, p.trb as rebounds_per_game
        FROM watchlist w
        JOIN players p ON w.pid = p.pid
        WHERE w.username = ? AND w.watchlist_name = ?
        """

        cursor.execute(query, (username, watchlist_name))
        rows = cursor.fetchall()
        watchlist = [helpers.dict_from_row(row, cursor) for row in rows]
        cursor.close()

        return jsonify({"success": True, "watchlist": watchlist})

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


@watchlist_bp.route("/watchlist", methods=["POST"])
def create_watchlist():
    """Create a new watchlist for a user"""
    try:
        data = request.json
        username = data.get("username")
        watchlist_name = data.get("watchlist_name")

        if not username or not watchlist_name:
            return jsonify({"success": False, "error": "Missing username or watchlist_name"}), 400

        connection = db.get_db()
        cursor = connection.cursor()

        check_query = "SELECT * FROM user_watchlists WHERE username = ? AND watchlist_name = ?"
        cursor.execute(check_query, (username, watchlist_name))

        if cursor.fetchone():
            cursor.close()
            return jsonify({"success": False, "error": "Watchlist already exists"}), 400

        insert_query = "INSERT INTO user_watchlists (username, watchlist_name) VALUES (?, ?)"
        cursor.execute(insert_query, (username, watchlist_name))

        connection.commit()
        cursor.close()

        return jsonify({"success": True, "message": "Watchlist created"})

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


@watchlist_bp.route("/watchlist/add", methods=["POST"])
def add_to_watchlist():
    """Add a player to a user's watchlist"""
    try:
        data = request.json
        username = data.get("username")
        watchlist_name = data.get("watchlist_name")
        player_id = data.get("player_id")

        if not username or not watchlist_name or not player_id:
            return jsonify({"success": False, "error": "Missing username, watchlist_name, or player_id"}), 400

        connection = db.get_db()
        cursor = connection.cursor()

        check_watchlist_query = "SELECT * FROM user_watchlists WHERE username = ? AND watchlist_name = ?"
        cursor.execute(check_watchlist_query, (username, watchlist_name))

        if not cursor.fetchone():
            create_watchlist_query = "INSERT INTO user_watchlists (username, watchlist_name) VALUES (?, ?)"
            cursor.execute(create_watchlist_query, (username, watchlist_name))

        check_query = "SELECT * FROM watchlist WHERE username = ? AND watchlist_name = ? AND pid = ?"
        cursor.execute(check_query, (username, watchlist_name, player_id))

        if cursor.fetchone():
            cursor.close()
            return jsonify({"success": False, "error": "Player already in watchlist"}), 400

        valid_pid_query = "SELECT * FROM players WHERE pid = ?"
        cursor.execute(valid_pid_query, (player_id,))
        
        if not cursor.fetchone():
            cursor.close()
            return jsonify({"success": False, "error": "Invalid player id"})

        insert_query = "INSERT INTO watchlist (username, watchlist_name, pid) VALUES (?, ?, ?)"
        cursor.execute(insert_query, (username, watchlist_name, player_id))

        connection.commit()
        cursor.close()

        return jsonify({"success": True, "message": "Player added to watchlist"})

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


@watchlist_bp.route("/watchlist", methods=["DELETE"])
def delete_watchlist():
    """Delete a watchlist"""
    try:
        data = request.json
        username = data.get("username")
        watchlist_name = data.get("watchlist_name")

        if not username or not watchlist_name:
            return jsonify({"success": False, "error": "Missing username or watchlist_name"}), 400

        connection = db.get_db()
        cursor = connection.cursor()

        # Delete all players from the watchlist first (due to foreign key constraint)
        delete_players_query = "DELETE FROM watchlist WHERE username = ? AND watchlist_name = ?"
        cursor.execute(delete_players_query, (username, watchlist_name))

        delete_query = "DELETE FROM user_watchlists WHERE username = ? AND watchlist_name = ?"
        cursor.execute(delete_query, (username, watchlist_name))

        connection.commit()
        cursor.close()

        return jsonify({"success": True, "message": "Watchlist deleted"})

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


@watchlist_bp.route("/watchlist/remove", methods=["DELETE"])
def remove_from_watchlist():
    """Remove a player from a user's watchlist"""
    try:
        data = request.json
        username = data.get("username")
        watchlist_name = data.get("watchlist_name")
        player_id = data.get("player_id")

        if not username or not watchlist_name or not player_id:
            return jsonify({"success": False, "error": "Missing username, watchlist_name, or player_id"}), 400

        connection = db.get_db()
        cursor = connection.cursor()

        delete_query = "DELETE FROM watchlist WHERE username = ? AND watchlist_name = ? AND pid = ?"
        cursor.execute(delete_query, (username, watchlist_name, player_id))

        connection.commit()
        cursor.close()

        return jsonify({"success": True, "message": "Player removed from watchlist"})

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


@watchlist_bp.route("/watchlists/<string:username>", methods=["GET"])
def get_user_watchlists(username):
    """Get all watchlists for a user"""
    try:
        connection = db.get_db()
        cursor = connection.cursor()

        query = "SELECT watchlist_name FROM user_watchlists WHERE username = ?"
        cursor.execute(query, (username,))
        rows = cursor.fetchall()
        watchlists = [helpers.dict_from_row(row, cursor) for row in rows]
        cursor.close()

        return jsonify({"success": True, "watchlists": watchlists})

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500
