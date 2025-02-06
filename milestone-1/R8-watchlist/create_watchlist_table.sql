CREATE TABLE IF NOT EXISTS watchlist (
  username VARCHAR(20) NOT NULL,
  pid INTEGER NOT NULL,
  PRIMARY KEY (username, pid),
  FOREIGN KEY (username) REFERENCES users(username),
  FOREIGN KEY (pid) REFERENCES players(pid)
);
