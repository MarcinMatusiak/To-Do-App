const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

app.use(bodyParser.urlencoded({extended: true }));

//View engine setup
const mustacheExpressInstance = mustacheExpress();
mustacheExpressInstance.cache = null;
app.engine('mustache', mustacheExpressInstance);
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

//Database connection
var db = mongoose.connect('mongodb://localhost:27017/SafetyList', {
    useNewUrlParser: true
});

db
    .then(() => console.log('Connected to MongoDB!'))
    .catch(err => console.error('Could not connect to MongoDB.', err));

app.get('/', (req, res) => {
    res.render('index', {});
});

const port = process.env.PORT || 3000;

app.listen(port, () =>{
    console.log(`Listening on port ${port}`);
});