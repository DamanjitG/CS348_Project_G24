import os

from flask import Flask, request, jsonify
from . import db, helpers
from flask_cors import CORS
from .watchlist_api import watchlist_bp

def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    CORS(app)
    app.register_blueprint(watchlist_bp)
    app.config.from_mapping(
        DATABASE=os.path.join(os.getcwd(), 'g24_db.sqlite'),
    )

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    # a simple page that says hello
    @app.route('/hello')
    def hello():
        return 'Hello, World!'
    
    @app.route('/players')
    def players():
        # possible variables to use in the query. Change these to get different results
        # set to "" to remove from query
        playerSearch = request.args.get("players")
        posFilter = request.args.get("position")
        orderByCol = request.args.get("column")
        direction = request.args.get("dir") 
        
        database = db.get_db()

        queryLine1 = "select name, team, age, pos, g, mp, fg, threept, ft, trb, ast, stl, blk, tov, pts, fantasy from players as p"
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

    
    db.init_app(app)
    return app
