from flask import Blueprint, request, jsonify
from . import db

login_bp = Blueprint("auth", __name__, url_prefix="/api")

def dict_from_row(row, cursor):
    if not row:
        return None
    return {description[0]: value for description, value in zip(cursor.description, row)}



@login_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"success": False, "error": "Either missing username or password"}), 400

    connection = db.get_db()
    cursor = connection.cursor()

    query = "SELECT * FROM users WHERE username = ?"
    cursor.execute(query, (username,))
    loginUser = cursor.fetchone()
    userRow = dict_from_row(loginUser, cursor)
    cursor.close()

    if userRow is None:
        return jsonify({"success": False, "error": "This user has not been registered"}), 404

    if userRow["password"] != password:
        return jsonify({"success": False, "error": "Inputted password doesn't match a user"}), 401

    return jsonify({"success": True, "message": "Logged in successfully", "user": username}), 200

@login_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    print("DEBUG: data from request:", data)
    username = data.get("username")
    password = data.get("password")
    try:

        if not username or not password:
            return jsonify({"success": False, "error": "Either missing username or password"}), 400

        connection = db.get_db()
        cursor = connection.cursor()

        query = "INSERT INTO users (username, password) VALUES (?,?)"
        cursor.execute(query, (username, password))
        connection.commit()
        cursor.close()

        return jsonify({"success": True, "message": "User has been REGISTERED"})
    except Exception as e:
        return jsonify({"success": False, "message": "User FAILED to REGISTER"})