const express = require('express');
const path = require('path');
const ejs = require('ejs');
const bodyParser = require('body-parser');

const app = express();

const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {

    return res.render('home', {
        title: 'home',
        css: 'home'


    })
});
app.use('/home', require('./routes/home'));
app.use('/login', require('./routes/login'));
app.use('/categories', require('./routes/categories'));
app.use('/programs', require('./routes/programs'));
app.use('/joinOurStaff', require('./routes/joinOurStaff'));
app.use('/Account_Settings', require('./routes/Account_Settings'));
app.use('/Achievements', require('./routes/Achievements'));

app.listen(port, (error) => {
    if (error) return console.log(error);
    console.log(`server started listening at ${port}`);
});