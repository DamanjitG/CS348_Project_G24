SELECT * 
FROM players
WHERE creator IS NOT NULL
AND pos = :pos