-- Get Custom Player By PID
SELECT * 
FROM players
WHERE creator IS NOT NULL
AND pid = :pid