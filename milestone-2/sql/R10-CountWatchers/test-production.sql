-- List player names and the amount of users watching them
SELECT name AS top_players, COUNT(DISTINCT(username)) AS total_watchers
FROM players NATURAL LEFT OUTER JOIN watchlist
GROUP BY pid
ORDER BY total_watchers DESC
LIMIT 10;

-- List point guard names and the amount of users watching them
SELECT name AS top_players, COUNT(DISTINCT(username)) AS total_watchers
FROM players NATURAL LEFT OUTER JOIN watchlist
WHERE pos = 'PG'
GROUP BY pid
ORDER BY total_watchers DESC
LIMIT 10;
