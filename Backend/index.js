const express = require('express');
const app = express();
const BodyParser = require('body-parser');
const connectDB = require('./connection');
const UserService = require('./Services/UserService');
const ReminderService = require('./Services/ReminderService');
const { check, validationResult } = require('express-validator');

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended: true}));

//Connect to DB
connectDB();
//End of Connect to DB

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
app.post("/new-reminder",  [
    // username must be an email
    check('reminderName').isLength({min: 1}),
    check('startDate').isEmpty(),
    check('endDate').isEmpty(),
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