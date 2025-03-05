-- Template
INSERT INTO players (
    pid, name, age, team, pos, g, mp, fg, fga, fgp,
    threept, threepta, efgp, ft, fta, ftp,
    orb, drb, trb, ast, stl, blk, tov, pf, pts, creator
)
VALUES (
    $pid, $name, $age, $team, $pos, $g, $mp, $fg, $fga, $fgp,
    $threept, $threepta, $efgp, $ft, $fta, $ftp,
    $orb, $drb, $trb, $ast, $stl, $blk, $tov, $pf, $pts, $creator
);

-- Sample Query 1: Inserts a custom player to the DB
INSERT INTO players (
    pid, name, age, team, pos, g, mp, fg, fga, fgp,
    threept, threepta, efgp, ft, fta, ftp,
    orb, drb, trb, ast, stl, blk, tov, pf, pts, creator
)
VALUES (
    1000,                   
    'Luka Lakers',          
    25,                     
    'LAL',                  
    'SG',                   
    42,                     
    42.5,                   
    15,                     
    20,                     
    75.0,                   
    4,                      
    6,                      
    80.0,                   
    8,                     
    10,                     
    80.0,                   
    4,
    5,
    9, 
    7,         
    2,                  
    1,
    3,                     
    2,                     
    42,                     
    'DataBaseLover'         
);
-- Sample Query 2: Returns all custom players
SELECT * 
FROM players
WHERE creator IS NOT NULL;


-- Sample Template: Returns the custom player of a certain position
SELECT * 
FROM players
WHERE creator IS NOT NULL
AND pos = $pos

--Sample Query 3: Returns custom players with the lowest point scorers at the top
SELECT * 
FROM players
WHERE creator IS NOT NULL
ORDER BY pts ASC

--Sample Query 4:
SELECT * 
FROM players
WHERE creator IS NOT NULL
AND pid = 1000