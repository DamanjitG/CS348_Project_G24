import pandas as pd, numpy as np

def initialize_db(conn, sample=False):
    player_stats = pd.read_csv("playerStats.csv")

    # Drop columns we aren't concerned with
    dropped_cols = ["GS", "Rk","3P%","2P","2PA","2P%", "Awards", "Player-additional", "FG%", "FTA", "FT%", "eFG%"]
    player_stats.drop(columns=dropped_cols, inplace=True)

    # When a player is traded, they have three entries in the csv: one for their stats on each team, and one under team "2TM"
    #   which is their aggregated stats. The team they were traded to is always the last of their rows
    # We want to keep their aggregated stats, but keep their team as the one they are currently on, then drop the extra rows.
    rows_to_drop = []
    for index, row in player_stats.iterrows():
            if row["Team"] == "2TM": # This is the row with the stats we want to keep
                # Get the row to find the team they were traded to (i.e. the team they are currently on)
                current_team_row = player_stats.iloc[index + 2]  # Third row in the 3-row structure
                player_stats.at[index, "Team"] = current_team_row["Team"]
                rows_to_drop.extend([index + 1, index + 2])
    player_stats = player_stats.drop(rows_to_drop).reset_index(drop=True)

    # Drop players who have played less than five games
    player_stats = player_stats.loc[player_stats["G"] >= 5]

    # Add creator column (value is null for real players, but used for custom players)
    player_stats["creator"] = np.nan

    # make all columns lowercase
    columns_renamed = {x:x.lower() for x in list(player_stats.columns)}
    # renaming some columns
    columns_renamed["Player"] = "name"
    columns_renamed["3P"] = "threept"
    columns_renamed["3PA"] = "threepta"
    player_stats.rename(columns=columns_renamed, inplace=True)

    if sample:
        player_stats = player_stats.iloc[:50]

    positions=["\'PG\'","\'SG\'","\'SF\'","\'PF\'","\'C\'"]

    deletePlayersTable = "DROP TABLE IF EXISTS players"
    createPlayersTable = f""" CREATE TABLE players (
                        pid INTEGER PRIMARY KEY NOT NULL,
                        name TEXT NOT NULL,
                        age INT,
                        team TEXT,
                        pos VARCHAR(2) CHECK( pos IN ({", ".join(positions)}) ) NOT NULL,
                        g INT,
                        mp DOUBLE,
                        fg DOUBLE CHECK (fg >= 0),
                        fga DOUBLE,
                        threept DOUBLE CHECK (threept >= 0),
                        threepta DOUBLE,
                        ft DOUBLE CHECK (ft >= 0),
                        orb DOUBLE,
                        drb DOUBLE,
                        trb DOUBLE CHECK (trb >= 0),
                        ast DOUBLE CHECK (ast >= 0),
                        stl DOUBLE CHECK (stl >= 0),
                        blk DOUBLE CHECK (blk >= 0),
                        tov DOUBLE CHECK (tov >= 0),
                        pf DOUBLE CHECK (pf >= 0),
                        pts DOUBLE CHECK (pts >= 0),
                        fantasy DOUBLE,
                        creator VARCHAR(20),
                        FOREIGN KEY(creator) REFERENCES users(username),
                        CHECK (trb IS NULL OR orb+drb > trb - 0.2 AND orb+drb < trb + 0.2)
                        CHECK (threepta IS NULL OR threepta >= threept)
                        CHECK (fga IS NULL OR (fga >= fg))
                    );
                """

    conn.execute(deletePlayersTable)
    conn.execute(createPlayersTable)

    # At this point the database has been created with tables

    conn.execute("CREATE INDEX idx_players_fantasy ON players(fantasy);")
    conn.execute("CREATE INDEX idx_players_name ON players(name);")
    conn.execute("CREATE INDEX idx_players_pos ON players(pos);")

    insertTriggerSql = """ 
        CREATE TRIGGER fantasy_trigger_insert
        AFTER INSERT
        ON players
        FOR EACH ROw 
        BEGIN 
                UPDATE players
                SET fantasy = ROUND((threept * 3) + (fg * 2) + (ft * 1) + (trb + 1.2) + (ast * 1.5) + (blk * 2) + (stl * 2) + (tov * -1) + (pf * -1), 2);
        END;
        """
    conn.execute(insertTriggerSql)

    updateTriggerSql = """ 
        CREATE TRIGGER fantasy_trigger_update
        AFTER UPDATE of players
        ON players
        FOR EACH ROw 
        BEGIN 
                UPDATE players
                SET fantasy = (threept * 3) + (fg * 2) + (trb + 1.2) + (ast * 1.5) + (blk * 2) + (stl * 2) + (tov * -1) + (pf * -1);
        END;
        """
    conn.execute(updateTriggerSql)

    # Insert player stats from the CSV
    player_stats.to_sql(name="players", con=conn, schema="m1", if_exists="append", index=False)

    deleteUsersTable = "DROP TABLE IF EXISTS users"
    createUsersTable = """ CREATE TABLE users (
                        username VARCHAR(20) PRIMARY KEY NOT NULL,
                        password VARCHAR(20) NOT NULL
                );
            """
    conn.execute(deleteUsersTable)
    conn.execute(createUsersTable)

    # Insert sample data for users
    insertUsers = """
            INSERT INTO users (username, password) VALUES
            ('AaronAndrews', 'password1'),
            ('BobbyBrown', 'password2'),
            ('TestUser', 'testPassword'); 
    """
    conn.execute(insertUsers)
    conn.commit()

    deleteUserWatchlistsTable = "DROP TABLE IF EXISTS user_watchlists"
    deleteWatchlistTable = "DROP TABLE IF EXISTS watchlist"
    createUserWatchlistsTable = """
    CREATE TABLE IF NOT EXISTS user_watchlists (
      username VARCHAR(20) NOT NULL,
      watchlist_name VARCHAR(20) NOT NULL,
      PRIMARY KEY (username, watchlist_name),
      FOREIGN KEY (username) REFERENCES users(username)
    );
    """
    # Create watchlist table.
    createWatchlistTable = """
    CREATE TABLE IF NOT EXISTS watchlist (
      username VARCHAR(20) NOT NULL,
      watchlist_name VARCHAR(20) NOT NULL,
      pid INTEGER NOT NULL,
      PRIMARY KEY (username, watchlist_name, pid),
      FOREIGN KEY (username, watchlist_name) REFERENCES user_watchlists(username, watchlist_name),
      FOREIGN KEY (pid) REFERENCES players(pid)
    );
    """

    conn.execute(deleteUserWatchlistsTable)
    conn.execute(deleteWatchlistTable)

    conn.execute(createUserWatchlistsTable)
    conn.execute(createWatchlistTable)

    # Insert sample data for user watchlists
    insertUserWatchLists = """
            INSERT INTO user_watchlists (username, watchlist_name) VALUES
            ('AaronAndrews', 'My Players'),
            ('AaronAndrews', 'WatchList2'),
            ('AaronAndrews', 'New Watchlist'),
            ('BobbyBrown', 'Trade Targets'), 
            ('BobbyBrown', 'Point Guards');
    """
    conn.execute(insertUserWatchLists)
    conn.commit()

    # Insert sample data for user watchlists
    insertUserWatchLists = """
            INSERT INTO watchlist (username, watchlist_name, pid) VALUES
            ('AaronAndrews', 'My Players', 1),
            ('AaronAndrews', 'My Players', 10),
            ('AaronAndrews', 'My Players', 14),
            ('AaronAndrews', 'My Players', 19),
            ('AaronAndrews', 'My Players', 23),
            ('AaronAndrews', 'WatchList2', 11),
            ('AaronAndrews', 'WatchList2', 12),
            ('AaronAndrews', 'WatchList2', 2),
            ('BobbyBrown', 'Trade Targets', 3), 
            ('BobbyBrown', 'Trade Targets', 6),
            ('BobbyBrown', 'Trade Targets', 10),  
            ('BobbyBrown', 'Point Guards', 4),
            ('BobbyBrown', 'Point Guards', 13),
            ('BobbyBrown', 'Point Guards', 17),
            ('BobbyBrown', 'Point Guards', 29);
    """
    conn.execute(insertUserWatchLists)
    conn.commit()
