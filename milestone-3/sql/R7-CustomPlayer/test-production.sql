-- Inserts a custom player to the DB
INSERT INTO players (
    pid, name, age, team, pos, g,
    pts, ast, trb, stl, blk, tov, 
    threept, fg, pf, ft, creator 
)
VALUES (
    1000,                   
    'Luka Lakers',          
    25,                     
    'LAL',                  
    'SG',                   
    42,
    29.4,
    7.5,
    6.2,
    1.7,
    0.8,
    2.1,
    3.2,
    7.1,
    2.5,
    7.2,                             
    'BobbyBrown'         
);

-- Inserts a custom player to the DB
INSERT INTO players (
    pid, name, age, team, pos, g,
    pts, ast, trb, stl, blk, tov, 
    threept, fg, pf, ft, creator 
)
VALUES (
    1001,                   
    'Bron Bron',          
    40,                     
    'LAL',                  
    'SF',                   
    81,
    31.2,
    9.3,
    10.2,
    1.3,
    1.9,
    1.4,
    2.7,
    9.7,
    2.9,
    6.2,                             
    'AaronAndrews'         
);


-- Returns all custom players
SELECT * 
FROM players
WHERE creator IS NOT NULL;


-- Select the custom player with pid 1000
SELECT * 
FROM players
WHERE creator IS NOT NULL
AND pid = 1000


-- Returns custom players with the lowest point scorers at the top
SELECT * 
FROM players
WHERE creator IS NOT NULL
ORDER BY pts ASC

-- Returns all custom players with position SF
SELECT pos
FROM players
WHERE creator IS NOT NULL AND pos = 'SF'