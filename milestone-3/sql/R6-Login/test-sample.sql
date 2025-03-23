-- Registering user insert:
INSERT INTO Users (username, password)
VALUES ('DataBaseLover', 'DataBasePassword123!');

-- Login and find valid user with username and password:
SELECT *
FROM Users
WHERE username = 'DataBaseLover' AND password = 'DataBasePassword123!';