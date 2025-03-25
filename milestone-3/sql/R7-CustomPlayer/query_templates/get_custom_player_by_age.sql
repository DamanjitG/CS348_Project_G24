-- Get Custom Player By Age
SELECT * 
FROM players
WHERE creator IS NOT NULL
AND age = :age