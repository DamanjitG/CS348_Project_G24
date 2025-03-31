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
                        age INT CHECK (age >= 18),
                        team TEXT,
                        pos VARCHAR(2) CHECK( pos IN ({", ".join(positions)}) ) NOT NULL,
                        g INT CHECK (g >= 0),
                        mp DOUBLE CHECK (mp >= 0),
                        fg DOUBLE CHECK (fg >= 0),
                        fga DOUBLE,
                        threept DOUBLE CHECK (threept >= 0),
                        threepta DOUBLE,
                        ft DOUBLE CHECK (ft >= 0),
                        orb DOUBLE CHECK (orb >= 0),
                        drb DOUBLE CHECK (drb >= 0),
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
                        CHECK (threepta IS NULL OR (threepta >= threept))
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
    
    # Create best teams per watchlist view
    createBestTeamsView = """
        CREATE VIEW IF NOT EXISTS best_watchlist_teams AS
        WITH 
        pg_best AS (
        SELECT w.username, w.watchlist_name, p.pid, p.name, p.fantasy
        FROM watchlist w
        JOIN players p ON w.pid = p.pid
        WHERE p.pos = 'PG'
        AND p.fantasy = (
                SELECT MAX(p2.fantasy)
                FROM watchlist w2
                JOIN players p2 ON w2.pid = p2.pid
                WHERE w2.username = w.username 
                AND w2.watchlist_name = w.watchlist_name 
                AND p2.pos = 'PG'
        )),
        sg_best AS (
        SELECT w.username, w.watchlist_name, p.pid, p.name, p.fantasy
        FROM watchlist w
        JOIN players p ON w.pid = p.pid
        WHERE p.pos = 'SG'
        AND p.fantasy = (
                SELECT MAX(p2.fantasy)
                FROM watchlist w2
                JOIN players p2 ON w2.pid = p2.pid
                WHERE w2.username = w.username 
                AND w2.watchlist_name = w.watchlist_name 
                AND p2.pos = 'SG'
        )),
        sf_best AS (
        SELECT w.username, w.watchlist_name, p.pid, p.name, p.fantasy
        FROM watchlist w
        JOIN players p ON w.pid = p.pid
        WHERE p.pos = 'SF'
        AND p.fantasy = (
                SELECT MAX(p2.fantasy)
                FROM watchlist w2
                JOIN players p2 ON w2.pid = p2.pid
                WHERE w2.username = w.username 
                AND w2.watchlist_name = w.watchlist_name 
                AND p2.pos = 'SF'
        )),
        pf_best AS (
        SELECT w.username, w.watchlist_name, p.pid, p.name, p.fantasy
        FROM watchlist w
        JOIN players p ON w.pid = p.pid
        WHERE p.pos = 'PF'
        AND p.fantasy = (
                SELECT MAX(p2.fantasy)
                FROM watchlist w2
                JOIN players p2 ON w2.pid = p2.pid
                WHERE w2.username = w.username 
                AND w2.watchlist_name = w.watchlist_name 
                AND p2.pos = 'PF'
        )),
        c_best AS (
        SELECT w.username, w.watchlist_name, p.pid, p.name, p.fantasy
        FROM watchlist w
        JOIN players p ON w.pid = p.pid
        WHERE p.pos = 'C'
        AND p.fantasy = (
                SELECT MAX(p2.fantasy)
                FROM watchlist w2
                JOIN players p2 ON w2.pid = p2.pid
                WHERE w2.username = w.username 
                AND w2.watchlist_name = w.watchlist_name 
                AND p2.pos = 'C'
        ))
        SELECT 
        uw.username,
        uw.watchlist_name,
        pg_best.name AS PG,
        pg_best.fantasy AS PG_fantasy,
        sg_best.name AS SG,
        sg_best.fantasy AS SG_fantasy,
        sf_best.name AS SF,
        sf_best.fantasy AS SF_fantasy,
        pf_best.name AS PF,
        pf_best.fantasy AS PF_fantasy,
        c_best.name AS C,
        c_best.fantasy AS C_fantasy,
        ROUND((pg_best.fantasy + sg_best.fantasy + sf_best.fantasy +
        pf_best.fantasy + c_best.fantasy), 2) AS total_fantasy
        FROM user_watchlists uw
        JOIN pg_best ON uw.username = pg_best.username 
                AND uw.watchlist_name = pg_best.watchlist_name
        JOIN sg_best ON uw.username = sg_best.username 
                AND uw.watchlist_name = sg_best.watchlist_name
        JOIN sf_best ON uw.username = sf_best.username 
                AND uw.watchlist_name = sf_best.watchlist_name
        JOIN pf_best ON uw.username = pf_best.username 
                AND uw.watchlist_name = pf_best.watchlist_name
        JOIN c_best  ON uw.username = c_best.username 
                AND uw.watchlist_name = c_best.watchlist_name;

    """
    conn.execute(createBestTeamsView);
    conn.commit();

    # Insert sample data for user watchlists
    insertUserWatchLists = """
            INSERT INTO user_watchlists (username, watchlist_name) VALUES
            ('AaronAndrews', 'My Players'),
            ('AaronAndrews', 'WatchList2'),
            ('BobbyBrown', 'Trade Targets'), 
            ('BobbyBrown', 'Point Guards'),
            ('AaronAndrews', 'Allstars');
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
            ('BobbyBrown', 'Point Guards', 29),
            ('AaronAndrews', 'Allstars', 1),
            ('AaronAndrews', 'Allstars', 2),
            ('AaronAndrews', 'Allstars', 3),
            ('AaronAndrews', 'Allstars', 4),
            ('AaronAndrews', 'Allstars', 10),
            ('AaronAndrews', 'Allstars', 12),
            ('AaronAndrews', 'Allstars', 16);
    """
    conn.execute(insertUserWatchLists)
    conn.commit()
