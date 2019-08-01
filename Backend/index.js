const express = require('express');
const app = express();
const BodyParser = require('body-parser');
const connectDB = require('./connection');
const UserService = require('./Services/UserService');
const ReminderService = require('./Services/ReminderService');
const { check, validationResult } = require('express-validator');
const Models = require('./OrmModels/models');

const reminderModel = Models.reminderModel; 

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended: true}));

//Connect to DB
connectDB();
//End of Connect to DB


app.get("/reminders", (req, res) => {
  var param = req.query.type;
  reminderModel.find({'userID' : '5d3c2d49a4915c3e58960292'}, function(err, items){
    if(err) {
      res.send(err);
    } else {
      var result_array = [];
      items[0].reminders.find(function(element){
        if(element.reminderType == param)
          result_array.push(element);
      })
      res.send(result_array);
    }
  });
});

const registerNewUser = UserService.registerUser;
const addNewReminder = ReminderService.addReminder;

app.post("/new-user", (req, res) => {
    registerNewUser(req.body)
        .then(result => res.send(result))
        .catch(err => res.send(err));
});

 /*
    NEW REMINDER JSON
    {
        "startDate": x.x.x
        "endDate": x.x.x
        "reminderName": "x"
    }
 */

// TASKS 

//  Claudiu : 
//     frontend page  
//  Alex: 
//     get-ul pe types



app.post("/new-reminder",  [
    // username must be an email
    check('reminderName').isLength({ min: 1 }),
    check('startDate').isLength({ min: 1 }),
    check('endDate').isLength({ min: 1 }),
  ], async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    addNewReminder(req.body)
        .then(result => res.send(result))
        .catch(err => res.send(err));
});




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



app.listen(8000, () => {
    console.log("Example app listening on port 8000");
});

