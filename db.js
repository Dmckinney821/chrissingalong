
const pgp = require('pg-promise')();

const cn = {
    host: 'localhost',
    port: 5432,
    database: 'super-todo-app',
    user: 'postgres',
    password: ''

};
const db = pgp(cn);
function getTodo(id) {
return db.oneOrNone('SELECT * FROM todos where id=$1', [id])
}
function getAll() {
    return db.any('select * from todos');
}
getAll()
    .then((data) => {console.log(data);})
    .catch((error) => {console.log(error);});
// getTodo(2)
// .then(function(data) {
//     console.log(data);
// })
//      .catch(function(error) {
//         console.log(error);
//     });

// getTodo(2);

module.exports = {
    getTodo,
    getAll
};