-- SQL QUERY FOR REGISTERING: (UID IS AUTO INCREMENT ALREADY)
INSERT INTO Users (username, password)
VALUES ('UsernameTemp', 'PasswordTemp')

-- SQL QUERY FOR LOGGING IN:
SELECT *
FROM Users
WHERE username = 'UsernameTemp' AND password = 'PasswordTemp';