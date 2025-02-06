SELECT p.name
FROM players p
JOIN watchlist w ON p.pid = w.pid
WHERE w.username = :username;
