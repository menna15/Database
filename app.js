const express = require('express');
const path = require('path');
const ejs = require('ejs');
const bodyParser = require('body-parser');
 
const fileUpload = require('express-fileupload');

// SQL
// var mysql = require('mysql');

// var con = mysql.createConnection({
//     host: '127.0.0.1',
//     port: '3306',
//     user: 'root',
//     password:"1234"

// });

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   con.query("CREATE DATABASE MRPT", function (err, result) {
//     if (err) throw err;
//     console.log("Database created");
//   });
// });
//
 

const session = require('express-session');
const flush = require('connect-flash');
const app = express();

const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));



app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(fileUpload());

app.get('/', (req, res) => {

    return res.redirect('home');
});

//flash messages middleware
app.use(require('connect-flash')());
app.use((req, res, next) => {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

app.use('/home', require('./routes/home'));
app.use('/login', require('./routes/login'));
app.use('/signup', require('./routes/signup'));
app.use('/categories', require('./routes/categories'));
app.use('/programs', require('./routes/programs'));
app.use('/joinOurStaff', require('./routes/joinOurStaff'));
app.use('/course', require('./routes/course'));
app.use('/singleCourse', require('./routes/singleCourse'));
app.use('/Account_Settings', require('./routes/Account_Settings'));
app.use('/Achievements', require('./routes/Achievements'));
app.use('/add_any', require('./routes/add_any')); 
app.use('/Donate', require('./routes/Donate'));
app.listen(port,(error)=>{ 
    if(error) return console.log(error);
console.log(`server started listening at ${port}`);
 
});
