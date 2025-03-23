-- Create user_watchlists table
CREATE TABLE IF NOT EXISTS user_watchlists (
  username VARCHAR(20) NOT NULL,
  watchlist_name VARCHAR(20) NOT NULL,
  PRIMARY KEY (username, watchlist_name),
  FOREIGN KEY (username) REFERENCES users(username)
);

-- Create watchlist table
CREATE TABLE IF NOT EXISTS watchlist (
  username VARCHAR(20) NOT NULL,
  watchlist_name VARCHAR(20) NOT NULL,
  pid INTEGER NOT NULL,
  PRIMARY KEY (username, watchlist_name, pid),
  FOREIGN KEY (username, watchlist_name) REFERENCES user_watchlists(username, watchlist_name),
  FOREIGN KEY (pid) REFERENCES players(pid)
);

-- Add watchlist1 for user1
INSERT INTO user_watchlists (username, watchlist_name)
VALUES ('user1', 'watchlist1');

-- Add player 1 to watchlist1 for user1
INSERT INTO watchlist (username, watchlist_name, pid)
VALUES ('user1', 'watchlist1', 1);

-- Get watchlist1 for user1
SELECT p.name
FROM players p
JOIN watchlist w ON p.pid = w.pid
WHERE w.username = 'user1' AND w.watchlist_name = 'watchlist1';

-- Add player 2 to watchlist1 for user1
INSERT INTO watchlist (username, watchlist_name, pid)
VALUES ('user1', 'watchlist1', 2);

-- Get watchlist1 for user1 after adding player 2
SELECT p.name
FROM players p
JOIN watchlist w ON p.pid = w.pid
WHERE w.username = 'user1' AND w.watchlist_name = 'watchlist1';

-- Add watchlist2 for user1
INSERT INTO user_watchlists (username, watchlist_name)
VALUES ('user1', 'watchlist2');

-- Add player 77 to watchlist2 for user1
INSERT INTO watchlist (username, watchlist_name, pid)
VALUES ('user1', 'watchlist2', 77);

-- Get watchlist2 for user1
SELECT p.name
FROM players p
JOIN watchlist w ON p.pid = w.pid
WHERE w.username = 'user1' AND w.watchlist_name = 'watchlist2';

-- Get watchlist1 for user1 (again)
SELECT p.name
FROM players p
JOIN watchlist w ON p.pid = w.pid
WHERE w.username = 'user1' AND w.watchlist_name = 'watchlist1';

-- Get watchlist2 for user1 (again)
SELECT p.name
FROM players p
JOIN watchlist w ON p.pid = w.pid
WHERE w.username = 'user1' AND w.watchlist_name = 'watchlist2';

-- Add player 3 to watchlist1 for user2
INSERT INTO watchlist (username, watchlist_name, pid)
VALUES ('user2', 'watchlist1', 3);

-- Add player 4 to watchlist1 for user2
INSERT INTO watchlist (username, watchlist_name, pid)
VALUES ('user2', 'watchlist1', 4);

-- Get new_watchlist1 for user2
SELECT p.name
FROM players p
JOIN watchlist w ON p.pid = w.pid
WHERE w.username = 'user2' AND w.watchlist_name = 'new_watchlist1';

-- Add repeat_watchlist_name for user1
INSERT INTO user_watchlists (username, watchlist_name)
VALUES ('user1', 'repeat_watchlist_name');

-- Add repeat_watchlist_name for user2
INSERT INTO user_watchlists (username, watchlist_name)
VALUES ('user2', 'repeat_watchlist_name');

-- Get watchlist1 for user1 before deletion
SELECT p.name
FROM players p
JOIN watchlist w ON p.pid = w.pid
WHERE w.username = 'user1' AND w.watchlist_name = 'watchlist1';

-- Delete player 1 from watchlist1 for user1
DELETE FROM watchlist
WHERE username = 'user1' AND watchlist_name = 'watchlist1' AND pid = 1;

-- Get watchlist1 for user1 after deletion
SELECT p.name
FROM players p
JOIN watchlist w ON p.pid = w.pid
WHERE w.username = 'user1' AND w.watchlist_name = 'watchlist1';
