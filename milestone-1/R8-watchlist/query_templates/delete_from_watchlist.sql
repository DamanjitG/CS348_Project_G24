DELETE FROM watchlist
WHERE username = :username AND watchlist_name = :watchlist_name AND pid = :pid;
