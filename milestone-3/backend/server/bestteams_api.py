from flask import Blueprint, jsonify
from . import db, helpers

bestteams_bp = Blueprint("bestteams", __name__, url_prefix="/api")

@bestteams_bp.route(
    "/bestteam/<string:username>/<string:watchlist_name>", methods=["GET"]
)
def get_bestteam(username, watchlist_name):
    """Get the best team for a user's watchlist"""
    try:
        connection = db.get_db()
        cursor = connection.cursor()

        query = """
        SELECT watchlist_name, PG, PG_fantasy, SG, SG_fantasy, SF, SF_fantasy, PF, PF_fantasy, C, C_fantasy, total_fantasy
        FROM best_watchlist_teams bwt
        WHERE bwt.username = ? AND bwt.watchlist_name = ?
        """

        cursor.execute(query, (username, watchlist_name))
        rows = cursor.fetchall()
        bestteam = [helpers.dict_from_row(row, cursor) for row in rows]
        cursor.close()

        return jsonify({"success": True, "bestteam": bestteam})

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500