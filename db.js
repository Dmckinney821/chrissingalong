
const pgp = require('pg-promise')();
const cn = {
    host: 'localhost',
    port: 5432,
    database: 'super-todo-app',
    user: 'postgres',
    password: ''
};
const db = pgp(cn);
function getTodo(id) {return db.oneOrNone('SELECT * FROM todos where id=$1', [id])}
function getAll() {return db.any('select * from todos');}
function getPending () {return db.any('select * from todos where isdone=false');}

    // .then((data) => {console.log(data);})
    // .catch((error) => {console.log(error);});
function getFinished() {return db.any('select * from todos where isdone=true');}
function searchByTitle(searchString) {return db.any("select * from todos where title ilike '%$1#%", [searchString]);}
function deleteById() {return db.result('delete from todos where id=3', [id])}
function setFinished(id, isdone) {return db.result('update todos set isdone=$1 where id=$2', [isdone, id])}
function setTitle(id, newTitle) {return db.result("update todos set title='$1#' where id=$2'", [title, id])}
function add(title) {return db.one("insert into todos (title, isdone) values ('$1#', false) returning id", [title]);}
// add('drink some bouton')
//     .then((data) => {console.log(data);})
//     .catch((error) => {console.log(error);});

    module.exports = {
    getTodo,
    getAll,
    getPending,
    getFinished,
    searchByTitle,
    deleteById,
    setFinished,
    setTitle,
    add
};