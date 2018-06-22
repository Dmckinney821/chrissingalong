const express = require('express');
const app = experss();

const Todo = require('./db');
// only using route handlers so no handlebars here
app.get('/', (req, res) => {Todo.getALl()
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