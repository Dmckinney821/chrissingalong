-- get all the todos
select * from todos 
-- select from todos with id 2
where id=2;
-- select when still false
select * from todos
where isdone=false;
-- when true
select * from todos
where isdone=true;

-- searcing the titles
select * from todos
where title ilike '%scoop%';
-- example of failing code
select * from todos
where title ilike '%monster%';
-- example of update
update todos
set isdone=true
where id=1;
select * from todos;
-- change title example
update todos
set title='cook amazing dinner'
where id=3;