SELECT * 
FROM players
WHERE creator IS NOT NULL
AND age = :age