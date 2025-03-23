SELECT *
FROM users u
WHERE u.username = :username AND u.password = :password;