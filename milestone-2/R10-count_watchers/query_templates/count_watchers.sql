SELECT COUNT(*) AS total_watchers
FROM (
    SELECT DISTINCT(username)
    FROM watchlist
    WHERE pid = :pid
);
