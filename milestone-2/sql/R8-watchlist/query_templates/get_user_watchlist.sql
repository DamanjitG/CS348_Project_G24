SELECT p.name
FROM players p
JOIN watchlist w ON p.pid = w.pid
WHERE w.username = :username AND w.watchlist_name = :watchlist_name;
