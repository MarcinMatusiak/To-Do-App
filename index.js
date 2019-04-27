const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const users = require('./routes/users');
const login = require('./routes/login');
const tasks = require('./routes/tasks');
const updateTask = require('./routes/updates');
const config = require('config');

if(!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}

app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());
app.use('/', login);
app.use('/register', users);
app.use('/me', tasks);
app.use('/update', updateTask)

//View engine setup
const mustacheExpressInstance = mustacheExpress();
mustacheExpressInstance.cache = null;
app.engine('mustache', mustacheExpressInstance);
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/js/'));
app.use(express.static(__dirname + 'index.js'));

//Database connection
var db = mongoose.connect('mongodb://localhost:27017/SafetyList', {
    useNewUrlParser: true
});

db
    .then(() => console.log('Connected to MongoDB!'))
    .catch(err => console.error('Could not connect to MongoDB.', err));

app.get('/', (req, res) => {
    res.render('login', {});
});

app.get('/register', (req, res) => {
    res.render('register', {});
});

app.get('/me', (req, res) => {
    res.render('todo', {});
});

const port = process.env.PORT || 3000;

app.listen(port, () =>{
    console.log(`Listening on port ${port}`);
});