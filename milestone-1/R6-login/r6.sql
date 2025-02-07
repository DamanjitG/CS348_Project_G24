-- SQL QUERY FOR REGISTERING: (UID IS AUTO INCREMENT ALREADY) TEMPLATE
INSERT INTO Users (username, password)
VALUES ($username, $password);

-- Sample Query1:
INSERT INTO Users (username, password)
VALUES ('DataBaseLover', 'DataBasePassword123!');

-- SQL QUERY FOR LOGGING IN TEMPLATE:
SELECT *
FROM Users
WHERE username = $username AND password = $password;

-- Sample Query2:
SELECT *
FROM Users
WHERE username = 'DataBaseLover' AND password = 'DataBasePassword123!';