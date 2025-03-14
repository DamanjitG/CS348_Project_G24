CREATE TABLE IF NOT EXISTS user_watchlists (
  username VARCHAR(20) NOT NULL,
  watchlist_name VARCHAR(20) NOT NULL,
  PRIMARY KEY (username, watchlist_name),
  FOREIGN KEY (username) REFERENCES users(username)
);
