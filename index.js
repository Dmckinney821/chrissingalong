

const express = require('express');
const app = express();

const expressHbs = require('express-handlebars');
app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');
const static = express.static;
app.use(static('public'));
const Todo = require('./db');
// only using route handlers so no handlebars here
app.get('/', (req, res) => {Todo.getAll()
    .then((data) => {
        console.log(data);
        // res.send(data);
        res.render('homepage', {
            todos: data
        });
    })
    .catch((error) => {
        console.log(error);});
    });
app.get('/new', (req, res) => {
        res.render('todo-create-page');
    })
    
    

app.get('/:id', (req, res) => {
    Todo.getTodo(req.params.id)
    .then((data) => {
        console.log(data);
        // res.send(data);
        res.render('todo-detail-page', data);
    })
    .catch((error) => {
        console.log(error);});
    });


app.listen(3000, () => {
console.log('Your server is running!');
    });