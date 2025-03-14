import sqlite3
from datetime import datetime

import click
from flask import current_app, g

from . import createDB

def init_db():
    db = get_db()
    createDB.initialize_db(db)
    
def get_db():
    if 'db' not in g:   
        g.db = sqlite3.connect(
            current_app.config['DATABASE'],
            detect_types=sqlite3.PARSE_DECLTYPES
        )
        g.db.row_factory = sqlite3.Row

    return g.db

def close_db(e=None):
    db = g.pop('db', None)

    if db is not None:
        db.close()

def init_app(app):
    app.teardown_appcontext(close_db)
    app.cli.add_command(init_db_command)

@click.command('init-db')
def init_db_command():
    """Clear the existing data, and create and populate new tables."""
    init_db()
    click.echo('Initialized and populated the database.')


sqlite3.register_converter(
    "timestamp", lambda v: datetime.fromisoformat(v.decode())
)