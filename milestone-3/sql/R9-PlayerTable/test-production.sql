select name, team, age, pos, g, fg, threept, ft, trb, ast, stl, blk, tov, pts, fantasy, creator from players as p
where p.pos = 'PG'
and name like '%Don%'
order by fantasy desc;

select name, team, age, pos, g, fg, threept, ft, trb, ast, stl, blk, tov, pts, fantasy, creator from players as p
where p.pos = 'PG'
and name like '%Don%'
order by tov asc;

select name, team, age, pos, g, fg, threept, ft, trb, ast, stl, blk, tov, pts, fantasy, creator from players as p
where p.pos = 'C'
and name like '%Nik%'
order by trb desc;

select name, team, age, pos, g, fg, threept, ft, trb, ast, stl, blk, tov, pts, fantasy, creator from players as p
where p.pos = 'PF'
and name like '%%'
order by ast desc;