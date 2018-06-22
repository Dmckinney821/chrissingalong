const express = require('express');
const app = express();

const Todo = require('./db');
// only using route handlers so no handlebars here
app.get('/', (req, res) => {Todo.getAll()
    .then((data) => {
        console.log(data);
        res.send(data);
    })
    .catch((error) => {
        console.log(error);});
    });


app.get('/:id', (req, res) => {
    Todo.getTodo(req.params.id)
    .then((data) => {
        console.log(data);
        res.send(data);
    })
    .catch((error) => {
        console.log(error);});
    });



app.listen(3000, () => {
console.log('Your server is running!');
    });