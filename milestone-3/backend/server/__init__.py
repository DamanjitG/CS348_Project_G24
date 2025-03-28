import os

from flask import Flask, request, jsonify
from . import db, helpers
from flask_cors import CORS
from .watchlist_api import watchlist_bp
from .bestteams_api import bestteams_bp
from .login_api import login_bp
from .custom_api import custom_bp
from.players_api import players_bp
from .most_watched_api import  most_watched_bp

def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    CORS(app)
    app.register_blueprint(login_bp)
    app.register_blueprint(watchlist_bp)

    app.register_blueprint(custom_bp)
    app.register_blueprint(bestteams_bp)
    app.register_blueprint(players_bp)
    app.register_blueprint(most_watched_bp)

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
    
    db.init_app(app)
    return app
