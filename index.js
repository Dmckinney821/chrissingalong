



const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();

const setupAuth = require('./auth');
const ensureAuthenticated = require('./auth').ensureAuthenticated;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
const expressHbs = require('express-handlebars');
app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');
const static = express.static;
app.use(static('public'));

setupAuth(app);
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
app.get('/new', ensureAuthenticated, (req, res) => {
        res.render('todo-create-page');
    })

app.get('/:id/edit', (req, res) => {
    // res.render("todo-edit-page");
    Todo.getTodo(req.params.id) 
    .then((data) => {
        res.render('todo-edit-page', data);
    });   
});

app.post('/:id/edit', (req,res) => {
    Todo.setTitle(req.params.id, req.body.title)
    .then((data) => {
        res.redirect('/')
    })
});

    

app.post('/new', (req, res) => {console.log(req.body);
    // res.send('Hey you submitted the form')
    Todo.add(req.body.title)
    .then((data) => {
        // console.log(data);
        // res.send(data);
    // });
        res.redirect(`/${data.id}`);})
});
    


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