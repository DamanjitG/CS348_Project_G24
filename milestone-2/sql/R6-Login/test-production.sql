-- Registering user insert:
INSERT INTO Users (username, password)
VALUES ('DataBaseLover123', 'DataBasePassword123!');

-- Registering user2 insert:
INSERT INTO Users (username, password)
VALUES ('DataBaseHater123', 'DataBaseHaterPassword123!');

-- Registering user3 insert:
INSERT INTO Users (username, password)
VALUES ('DataBase123', 'Password123!');

-- Login and find valid user with username and password:
SELECT *
FROM users
WHERE username = 'DataBaseLover' AND password = 'DataBasePassword123!';

-- Get password for a user
SELECT password
FROM users
WHERE username = 'DataBase123'
-