-- CREATE CUSTOM PLAYER: (Players Relation name is TENTATIVE)
INSERT INTO Players (Player, Age, Team, Pos, G, MP, FG, 3P, 3PA, eFG%, FT, FTA, FT%, ORB, DRB, TRB, AST, STL, BLK, TOV, PF, PTS)
VALUES ('luka laker', 25, 'LAC', 'PG', 44, 22.5, 10, 40, 70, 67, 55, 30, 50, 60, 21, 42, 63, 11, 2, 2, 4, 15, 200)
-- FIX TO INCLUDE THE CORRECT ATTRIBUTES WHEN CHOSEN^
-

DELETE FROM Players
WHERE Players.name = '' 
--should probably show the users a list of players 
-- and get the metadata that way (from FE)?