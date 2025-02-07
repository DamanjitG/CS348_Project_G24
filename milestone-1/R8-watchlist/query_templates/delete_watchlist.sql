DELETE FROM user_watchlists
WHERE username = :username AND watchlist_name = :watchlist_name;
