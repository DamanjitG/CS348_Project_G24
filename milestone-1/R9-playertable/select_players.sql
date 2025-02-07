select name, team, age, pos, g, mp, fg, threept, ft, trb, ast, stl, blk, tov, pts, (pts + trb + ast + stl + blk - tov) as fantasy from players as p
where p.pos = 'PG'
and name like '%Don%'
order by fantasy desc