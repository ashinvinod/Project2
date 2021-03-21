const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require('express-session');
const request = require('request');
const fs = require('fs');
const multer = require('multer');
var User = require('./models/User.js')
var app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/userData');
var db =  mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback) {
    console.log("connection succeeded");
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({credentials: true}));

// app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret:"viuhr89ji8923urfheirfij",
    resave: false,
    saveUnintialized: true
}));


// Register a new user to the MongoDB database
app.post('/register', function(req, res)
{
    var lname = req.body.lname;
    var fname = req.body.fname;
    var password = req.body.password;
    var email = req.body.email;
    var phNumber = req.body.phNumber;
    var dob = req.body.dob;
    var photo = req.body.photo;

    var newuser = new User();
    newuser.lname = lname;
    newuser.fname = fname;
    newuser.password = password;
    newuser.email = email;
    newuser.phNumber = phNumber;
    newuser.dob = dob;
    newuser.img = '';

    newuser.save(function(err, savedUser) {
        if (err) {
          console.log(err);
            return res.status(500).send();
        }
        res.status(200).send();
    });
});

// Allow registered users to login
app.post('/login', function(req, res) {
    var fname = req.body.fname;
    var password = req.body.password;
    User.findOne({fname: fname, password: password}, function(err, user)
    {
      if (err) {
        console.log(err);
        return res.status(500).send();
      }
      else if (!user) {
        console.log("USER NOT FOUND!!!");
        return res.status(404).send();
      }
      else {
        req.session.user = user;
        return res.send(user);
      }
   });
});

app.post('/passchange', function(req, res) {
    let query = {fname: req.body.fname};
    let val = { $set: {'password': req.body.password}};
    User.updateOne(query, val, function(err, res1) {
      if (err) throw err;
      console.log("1 document updated");
      return res.status(200).send();
    });

});


// Logout users from their session
app.get('/logout', function(req, res) {
    req.session.destroy();
    return res.status(200).send();
});

app.get('/sessioncheck', function(req, res) {
  // if(!req.session.user) {
  //     console.log(req.session.user);
  //     return res.status(401).send("ERROR 401 - Unauthorized!");
  // }
  // else {
      return res.status(200).send();
  // }
})

// show dashboard
app.post('/dashboard', function(req, res) {
  console.log(req.body);
  let name = req.body.fname;
  User.findOne({fname: name}, function(err, user) {
    // if (err) {
    //   console.log(err);
    //   return status(500).send();
    // }
    // else {
    console.log(user);
      return res.send(user);
    // }
  })
  // return res.status(200).send();
})

// Deletes selected data
app.post("/delData", function(req, res) {
  console.log(req.body);
  let d = req.body.d;
  let query = {fname: req.body.id};
  let val = { $set: {[d]: 'Removed'}};
  User.updateOne(query, val, function(err, res1) {
    if (err) throw err;
    console.log("1 document updated");
    return res.status(200).send();
  });
});

// Uploads selected image
app.post("/uploadimg", function(req, res) {
  let query2 = {fname: req.body.fname}
  let img = req.body.img;
  let val2 = { $set: {img: img}}
  User.updateOne(query2, val2, function(err, res1) {
    if (err) throw err;
    console.log("image saved");
  })
  return res.status(200).send();
})


app.use(function(req, res, next) {
  // catch 404 and forward to error handler
  next(createError(404));
});
app.use(function(err, req, res, next) {
  // error handler
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
// if (process.env.NODE_ENV === 'production') {
//   // Serve any static files
//   // app.use(express.static(path.join(__dirname, 'client/build')));
//   // Handle React routing, return all requests to React app
//   app.get('*', function(req, res) {
//     res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
//   });
// }

let port = process.env.PORT || 9000;

app.get('/', function(req, res){
    res.set({
        'Access-control-Allow-Origin': 'http://localhost:3000'
    });
}).listen(port)

module.exports = app;
