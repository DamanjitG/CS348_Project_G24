import sqlite3, pandas as pd, numpy as np

if __name__ == "__main__":
    player_stats = pd.read_csv("playerStats.csv")

    # Drop columns we aren't concerned with
    dropped_cols = ["GS", "Rk","3P%","2P","2PA","2P%", "Awards", "Player-additional"]
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
    columns_renamed["FG%"] = "fgp"
    columns_renamed["eFG%"] = "efgp"
    columns_renamed["FT%"] = "ftp"
    columns_renamed["3P"] = "threept"
    columns_renamed["3PA"] = "threepta"
    player_stats.rename(columns=columns_renamed, inplace=True)


    conn = sqlite3.connect('m1.db')
    cursor = conn.cursor()

    positions=["\'PG\'","\'SG\'","\'SF\'","\'PF\'","\'C\'"]

    deleteUsersTable = "DROP TABLE IF EXISTS users"
    deletePlayersTable = "DROP TABLE IF EXISTS players"
    createUsersTable = """ CREATE TABLE users (
                            username VARCHAR(20) PRIMARY KEY NOT NULL,
                            password VARCHAR(20) NOT NULL
                    );
                """
    createPlayersTable = f""" CREATE TABLE players (
                        pid INTEGER PRIMARY KEY NOT NULL,
                        name TEXT NOT NULL,
                        age INT,
                        team TEXT,
                        pos VARCHAR(2) CHECK( pos IN ({", ".join(positions)}) ) NOT NULL,
                        g INT,
                        mp DOUBLE,
                        fg DOUBLE,
                        fga DOUBLE,
                        fgp DOUBLE,
                        threept DOUBLE,
                        threepta DOUBLE,
                        efgp DOUBLE,
                        ft DOUBLE,
                        fta DOUBLE,
                        ftp DOUBLE,
                        orb DOUBLE,
                        drb DOUBLE,
                        trb DOUBLE,
                        ast DOUBLE,
                        stl DOUBLE,
                        blk DOUBLE,
                        tov DOUBLE,
                        pf DOUBLE,
                        pts DOUBLE,
                        creator VARCHAR(20),
                        FOREIGN KEY(creator) REFERENCES users(username),
                        CHECK (trb IS NULL OR orb+drb > trb - 0.2 AND orb+drb < trb + 0.2)
                        CHECK (threepta IS NULL OR threepta >= threept)
                        CHECK (fta IS NULL OR (fta >= ft))
                        CHECK (fga IS NULL OR (fga >= fg))
                        CHECK (fgp IS NULL OR (fgp <= 100 AND fgp >= 0))
                        CHECK (efgp IS NULL OR (efgp <= 100 AND efgp >= 0))
                        CHECK (ftp IS NULL OR ftp <= 100 AND ftp >= 0)
                    );
                """

    cursor.execute(deletePlayersTable)
    cursor.execute(deleteUsersTable)
    cursor.execute(createUsersTable)
    cursor.execute(createPlayersTable)
    conn.commit()

    # At this point the database has been created with tables

    # Insert player stats from the CSV
    player_stats.to_sql(name="players", con=conn, schema="m1", if_exists="append", index=False)
    conn.commit()

    # Insert sample data for users
    insertUsers = """
            INSERT INTO users (username, password) VALUES
            ('user1', 'user1pass'),
            ('user2', 'user2pass'); 
    """
    cursor.execute(insertUsers)
    conn.commit()

    # Close the cursor
    cursor.close()
    conn.close()
