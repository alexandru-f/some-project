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
  reminderModel.findOne({'userID' : '5d43298a0107fa1d249a01ab'}, function(err, items){
    if(err) {
      res.send(err);
    } else {
      var result_array = [];
      items.reminders.find(function(element){
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

app.listen(8000, () => {
    console.log("Example app listening on port 8000");
});

