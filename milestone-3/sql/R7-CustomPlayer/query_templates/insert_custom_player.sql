-- Insert custom player to player table
INSERT INTO players (
    pid, name, age, team, pos, g, mp, fg, fga, fgp,
    threept, threepta, efgp, ft, fta, ftp,
    orb, drb, trb, ast, stl, blk, tov, pf, pts, creator
)
VALUES (
    :pid, :name, :age, :team, :pos, :g, :mp, :fg, :fga, :fgp,
    :threept, :threepta, :efgp, :ft, :fta, :ftp,
    :orb, :drb, :trb, :ast, :stl, :blk, :tov, :pf, :pts, :creator
);