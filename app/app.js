// Import express.js
const express = require("express");

// Create express app
var app = express();

// Add static files location
app.use(express.static("static"));

//use the pug templating engine
app.set('view engine', 'pug');
app.set('views', './app/views');

// Get the functions in the db.js file to use
const db = require('./services/db');

// Get the models
const { Courses } = require("./models/Courses");
const {Notes } = require("./models/Notes");

const { User } = require("./models/User");

// Set the sessions
var session = require('express-session');
app.use(session({
  secret: 'secretkeysdfjsflyoifasd',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Register
app.get('/register', function (req, res) {
    res.render('register');
});

// Login
app.get('/login', function (req, res) {
    res.render('login');
});


// Logout
app.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect('/login');
  });

  app.get('/StudentPage', function(req, res){
    // console.log(req.params);
     res.render('StudentPage');
 });
 
 app.get('/software-development-2-note', function(req, res){
      // console.log(req.params);
       res.render('software-development-2-note');
 });
 app.get('/database-note', function(req, res){
     // console.log(req.params);
      res.render('database-note');
 });
 app.get('/CyberSecurity-note', function(req, res){
    // console.log(req.params);
     res.render('CyberSecurity-note');
});


// Create a route for root - /
app.get("/", function(req, res) {
    console.log(req.session);
    if (req.session.u_id) {
		res.send('Welcome back, ' + req.session.u_id + '!');
	} else {
		res.send('Please login to view this page!');
	}
	res.end();
});


// Create a route for testing the db
app.get("/db_test", function(req, res) {
    // Assumes a table called test_table exists in your database
    sql = 'select * from courses';
    db.query(sql).then(results => {
        console.log(results);
        res.send(results)
    });
});

// Create a route for /goodbye
// Responds to a 'GET' request
app.get("/goodbye", function(req, res) {
    res.send("Goodbye world!");
});


// Task 3 single student page
app.get("/single-user/:id", function (req, res) {
    var stId = req.params.u_id;
    // Create a user class with the ID passed
    var user = new user(u_id);
    user.getIdFromEmail().then(
        Promise => {
            user.getProgramme().then(Promise => {
                student.getStudentModules().then(Promise => {
                    res.render('student', { student: student });
                });
            });
        });
});

// Create a dynamic route for /hello/<name>, where name is any value provided by user
// At the end of the URL
// Responds to a 'GET' request
app.get("/hello/:name", function(req, res) {
    // req.params contains any parameters in the request
    // We can examine it in the console for debugging purposes
    console.log(req.params);
    //  Retrieve the 'name' parameter and use it in a dynamically generated page
    res.send("Hello " + req.params.name);
});

app.post('/set-password', function(req, res){
    params = req.body;
    var user = new User(params.u_id)
})


// Check submitted email and password pair
app.post('/authenticate', function (req, res) {
    params = req.body;
    var user = new User(params.u_email);
    try {
        user.getIdFromEmail().then(u_id => {
            if (u_id) {
                user.authenticate(params.u_password).then(match => {
                    if (match) {
                        // Set the session for this user
                        req.session.u_id = u_id;
                        req.session.loggedIn = true;
                        res.redirect('/single-user/' + u_id);
                    }
                    else {
                        // TODO improve the user journey here
                        res.send('invalid password');
                    }
                });
            }
            else {
                res.send('invalid email');
            }
        })
    } catch (err) {
        console.error(`Error while comparing `, err.message);
    }
});

// Start server on port 3000
app.listen(3000,function(){
    console.log(`Server running at http://127.0.0.1:3000/`);
});