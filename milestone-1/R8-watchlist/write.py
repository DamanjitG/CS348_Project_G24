import sqlite3

###########################################################################################
# WARNING: We need to run the createDB.py file to create the database before running this #
###########################################################################################

conn = sqlite3.connect("../m1.db")
cursor = conn.cursor()

cursor.execute(
    "SELECT name FROM sqlite_master WHERE type='table' AND name='watchlist';"
)
if cursor.fetchone() is not None:
    cursor.execute("DELETE FROM watchlist;")

cursor.execute(
    "SELECT name FROM sqlite_master WHERE type='table' AND name='user_watchlists';"
)
if cursor.fetchone() is not None:
    cursor.execute("DELETE FROM user_watchlists;")

conn.commit()

outputFile = open("./watchlist.out", "w", encoding="utf-8")
outputFile.write("Watchlist Sample Queries\n")

queries = [
    (
        "Create user_watchlists table",
        """
    CREATE TABLE IF NOT EXISTS user_watchlists (
      username VARCHAR(20) NOT NULL,
      watchlist_name VARCHAR(20) NOT NULL,
      PRIMARY KEY (username, watchlist_name),
      FOREIGN KEY (username) REFERENCES users(username)
    );
    """,
        False,
    ),
    (
        "Create watchlist table",
        """
    CREATE TABLE IF NOT EXISTS watchlist (
      username VARCHAR(20) NOT NULL,
      watchlist_name VARCHAR(20) NOT NULL,
      pid INTEGER NOT NULL,
      PRIMARY KEY (username, watchlist_name, pid),
      FOREIGN KEY (username, watchlist_name) REFERENCES user_watchlists(username, watchlist_name),
      FOREIGN KEY (pid) REFERENCES players(pid)
    );
    """,
        False,
    ),
    (
        "Add watchlist1 for user1",
        """
    INSERT INTO user_watchlists (username, watchlist_name)
    VALUES ('user1', 'watchlist1');
    """,
        False,
    ),
    (
        "Add player 1 to watchlist1 for user1",
        """
    INSERT INTO watchlist (username, watchlist_name, pid)
    VALUES ('user1', 'watchlist1', 1);
    """,
        False,
    ),
    (
        "Get watchlist1 for user1",
        """
    SELECT p.name
    FROM players p
    JOIN watchlist w ON p.pid = w.pid
    WHERE w.username = 'user1' AND w.watchlist_name = 'watchlist1';
    """,
        True,
    ),
    (
        "Add player 2 to watchlist1 for user1",
        """
    INSERT INTO watchlist (username, watchlist_name, pid)
    VALUES ('user1', 'watchlist1', 2);
    """,
        False,
    ),
    (
        "Get watchlist1 for user1 after adding player 2",
        """
    SELECT p.name
    FROM players p
    JOIN watchlist w ON p.pid = w.pid
    WHERE w.username = 'user1' AND w.watchlist_name = 'watchlist1';
    """,
        True,
    ),
    (
        "Add watchlist2 for user1",
        """
    INSERT INTO user_watchlists (username, watchlist_name)
    VALUES ('user1', 'watchlist2');
    """,
        False,
    ),
    (
        "Add player 77 to watchlist2 for user1",
        """
    INSERT INTO watchlist (username, watchlist_name, pid)
    VALUES ('user1', 'watchlist2', 77);
    """,
        False,
    ),
    (
        "Get watchlist2 for user1",
        """
    SELECT p.name
    FROM players p
    JOIN watchlist w ON p.pid = w.pid
    WHERE w.username = 'user1' AND w.watchlist_name = 'watchlist2';
    """,
        True,
    ),
    (
        "Get watchlist1 for user1 (again)",
        """
    SELECT p.name
    FROM players p
    JOIN watchlist w ON p.pid = w.pid
    WHERE w.username = 'user1' AND w.watchlist_name = 'watchlist1';
    """,
        True,
    ),
    (
        "Get watchlist2 for user1 (again)",
        """
    SELECT p.name
    FROM players p
    JOIN watchlist w ON p.pid = w.pid
    WHERE w.username = 'user1' AND w.watchlist_name = 'watchlist2';
    """,
        True,
    ),
    (
        "Add player 3 to watchlist1 for user2",
        """
    INSERT INTO watchlist (username, watchlist_name, pid)
    VALUES ('user2', 'watchlist1', 3);
    """,
        False,
    ),
    (
        "Add player 4 to watchlist1 for user2",
        """
    INSERT INTO watchlist (username, watchlist_name, pid)
    VALUES ('user2', 'watchlist1', 4);
    """,
        False,
    ),
    (
        "Get new_watchlist1 for user2",
        """
    SELECT p.name
    FROM players p
    JOIN watchlist w ON p.pid = w.pid
    WHERE w.username = 'user2' AND w.watchlist_name = 'new_watchlist1';
    """,
        True,
    ),
    (
        "Add repeat_watchlist_name for user1",
        """
    INSERT INTO user_watchlists (username, watchlist_name)
    VALUES ('user1', 'repeat_watchlist_name');
    """,
        False,
    ),
    (
        "Add repeat_watchlist_name for user2",
        """
    INSERT INTO user_watchlists (username, watchlist_name)
    VALUES ('user2', 'repeat_watchlist_name');
    """,
        False,
    ),
    (
        "Get watchlist1 for user1 before deletion",
        """
    SELECT p.name
    FROM players p
    JOIN watchlist w ON p.pid = w.pid
    WHERE w.username = 'user1' AND w.watchlist_name = 'watchlist1';
    """,
        True,
    ),
    (
        "Delete player 1 from watchlist1 for user1",
        """
    DELETE FROM watchlist
    WHERE username = 'user1' AND watchlist_name = 'watchlist1' AND pid = 1;
    """,
        False,
    ),
    (
        "Get watchlist1 for user1 after deletion",
        """
    SELECT p.name
    FROM players p
    JOIN watchlist w ON p.pid = w.pid
    WHERE w.username = 'user1' AND w.watchlist_name = 'watchlist1';
    """,
        True,
    ),
]

for description, sql, print_result in queries:
    outputFile.write("\n" + description + "\n")
    cursor.execute(sql)
    if print_result:
        rows = cursor.fetchall()
        if rows and cursor.description is not None:
            columns = [desc[0] for desc in cursor.description]
            outputFile.write(", ".join(columns))
            outputFile.write("\n")
            for row in rows:
                outputFile.write(" ".join(str(col) for col in row))
                outputFile.write("\n")
        else:
            outputFile.write("No rows returned\n")
    else:
        conn.commit()
        outputFile.write("Rows affected: " + str(cursor.rowcount) + "\n")


outputFile.close()
cursor.close()
conn.close()
