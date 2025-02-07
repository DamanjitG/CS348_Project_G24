CREATE TABLE IF NOT EXISTS watchlist (
  username VARCHAR(20) NOT NULL,
  watchlist_name VARCHAR(20) NOT NULL,
  pid INTEGER NOT NULL,
  PRIMARY KEY (username, watchlist_name, pid),
  FOREIGN KEY (username, watchlist_name) REFERENCES user_watchlists(username, watchlist_name),
  FOREIGN KEY (pid) REFERENCES players(pid)
);
