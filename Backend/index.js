const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const bodyParser = require('body-parser');
const morgan = require('morgan');
const reminderRoutes = require('./routes/reminders');
const mongoose = require('mongoose');

//Connect to db 
mongoose.connect('mongodb://heroku_dzr1wfk8:2b39ff429gnsn0qmgaiiabha4u@ds345937.mlab.com:45937/heroku_dzr1wfk8', {

});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next(); 
});


//Routes which handle reminders requests (Post, Get, etc)
app.use('/reminders', reminderRoutes);


app.use((req, res,next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

// app.get("/reminders", (req, res) => {
//   var param = req.query.type;
//   reminderModel.findOne({'userID' : '5d43298a0107fa1d249a01ab'}, function(err, items){
//     if(err) {
//       res.send(err);
//     } else {
//       var result_array = [];
//       items.reminders.find(function(element){
//         if(element.reminderType == param)
//           result_array.push(element);
//       })
//       res.send(result_array);
//     }
//   });
// });

// const registerNewUser = UserService.registerUser;
// const addNewReminder = ReminderService.addReminder;
// const loginUser = UserService.loginUser;

// app.post("/register", (req, res) => {
//     registerNewUser(req.body)
//         .then(result => res.send(result))
//         .catch(err => res.send(err));
// });

// app.post("/login", (req, req, next) => {
//     loginUser(req.body)
//     .then(result => res.send(result))
//     .catch(err => res.send(err));
// });

// app.post("/new-reminder",  [
//     // username must be an email
//     check('reminderName').isLength({ min: 1 }),
//     check('startDate').isLength({ min: 1 }),
//     check('endDate').isLength({ min: 1 }),
//   ], async (req, res) => {

//     const errors = validationResult(req);

//     if (!errors.isEmpty()) {
//       return res.status(422).json({ errors: errors.array() });
//     }

//     addNewReminder(req.body)
//         .then(result => res.send(result))
//         .catch(err => res.send(err));
// });




// app.post('/user', [
//     // username must be an email
//     check('username').isEmail(),
//     // password must be at least 5 chars long
//     check('password').isLength({ min: 5 })
//   ], (req, res) => {
//     // Finds the validation errors in this request and wraps them in an object with handy functions
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(422).json({ errors: errors.array() });
//     }
  
//     User.create({
//       username: req.body.username,
//       password: req.body.password
//     }).then(user => res.json(user));
//   });



app.listen(port, () => {
    console.log("Example app listening on port 8000");
});

