-- Query all existing users
SELECT username FROM users;

-- Query all existing watchlists
SELECT username, watchlist_name FROM user_watchlists ORDER BY username;

-- Query AaronAndrews' watchlists
SELECT watchlist_name FROM user_watchlists WHERE username = 'AaronAndrews';

-- Query BobbyBrown's watchlists
SELECT watchlist_name FROM user_watchlists WHERE username = 'BobbyBrown';

-- Get players in AaronAndrews' 'My Players' watchlist
SELECT p.pid, p.name, p.team, p.pos, p.pts, p.ast, p.trb
FROM watchlist w
JOIN players p ON w.pid = p.pid
WHERE w.username = 'AaronAndrews' AND w.watchlist_name = 'My Players';

-- Get players in AaronAndrews' 'WatchList2' watchlist
SELECT p.pid, p.name, p.team, p.pos, p.pts, p.ast, p.trb
FROM watchlist w
JOIN players p ON w.pid = p.pid
WHERE w.username = 'AaronAndrews' AND w.watchlist_name = 'WatchList2';

-- Get players in BobbyBrown's 'Trade Targets' watchlist
SELECT p.pid, p.name, p.team, p.pos, p.pts, p.ast, p.trb
FROM watchlist w
JOIN players p ON w.pid = p.pid
WHERE w.username = 'BobbyBrown' AND w.watchlist_name = 'Trade Targets';

-- Get players in BobbyBrown's 'Point Guards' watchlist
SELECT p.pid, p.name, p.team, p.pos, p.pts, p.ast, p.trb
FROM watchlist w
JOIN players p ON w.pid = p.pid
WHERE w.username = 'BobbyBrown' AND w.watchlist_name = 'Point Guards';

-- Get statistics for AaronAndrews' 'My Players' watchlist
SELECT 
  AVG(p.pts) as avg_points, 
  AVG(p.ast) as avg_assists, 
  AVG(p.trb) as avg_rebounds,
  COUNT(*) as player_count
FROM watchlist w
JOIN players p ON w.pid = p.pid
WHERE w.username = 'AaronAndrews' AND w.watchlist_name = 'My Players';

-- Get statistics for BobbyBrown's 'Point Guards' watchlist
SELECT 
  AVG(p.pts) as avg_points, 
  AVG(p.ast) as avg_assists, 
  AVG(p.trb) as avg_rebounds,
  COUNT(*) as player_count
FROM watchlist w
JOIN players p ON w.pid = p.pid
WHERE w.username = 'BobbyBrown' AND w.watchlist_name = 'Point Guards';

-- Add a new player to AaronAndrews' 'New Watchlist'
INSERT INTO watchlist (username, watchlist_name, pid)
VALUES ('AaronAndrews', 'New Watchlist', 5);

-- Check AaronAndrews' 'New Watchlist' after addition
SELECT p.pid, p.name, p.team, p.pos, p.pts, p.ast, p.trb
FROM watchlist w
JOIN players p ON w.pid = p.pid
WHERE w.username = 'AaronAndrews' AND w.watchlist_name = 'New Watchlist';

-- Remove a player from AaronAndrews' 'My Players' watchlist
DELETE FROM watchlist 
WHERE username = 'AaronAndrews' 
AND watchlist_name = 'My Players' 
AND pid = 1;

-- Check AaronAndrews' 'My Players' watchlist after removal
SELECT p.pid, p.name, p.team, p.pos, p.pts, p.ast, p.trb
FROM watchlist w
JOIN players p ON w.pid = p.pid
WHERE w.username = 'AaronAndrews' AND w.watchlist_name = 'My Players';

-- Create a new watchlist for TestUser
INSERT INTO user_watchlists (username, watchlist_name)
VALUES ('TestUser', 'Test Watchlist');

-- Add players to TestUser's new watchlist
INSERT INTO watchlist (username, watchlist_name, pid)
VALUES ('TestUser', 'Test Watchlist', 7);

INSERT INTO watchlist (username, watchlist_name, pid)
VALUES ('TestUser', 'Test Watchlist', 8);

-- Check TestUser's watchlist
SELECT p.pid, p.name, p.team, p.pos, p.pts, p.ast, p.trb
FROM watchlist w
JOIN players p ON w.pid = p.pid
WHERE w.username = 'TestUser' AND w.watchlist_name = 'Test Watchlist';

-- Count players in each watchlist
SELECT username, watchlist_name, COUNT(*) as player_count
FROM watchlist
GROUP BY username, watchlist_name
ORDER BY username, player_count DESC;

-- Find position distribution across all watchlists
SELECT p.pos, COUNT(*) as count
FROM watchlist w
JOIN players p ON w.pid = p.pid
GROUP BY p.pos
ORDER BY count DESC;

-- Delete TestUser's watchlist (cleanup)
DELETE FROM watchlist 
WHERE username = 'TestUser' AND watchlist_name = 'Test Watchlist';

DELETE FROM user_watchlists 
WHERE username = 'TestUser' AND watchlist_name = 'Test Watchlist';
