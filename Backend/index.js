const express = require('express');
const app = express();
const BodyParser = require('body-parser');
const connectDB = require('./connection');
const UserService = require('./Services/UserService');
const ReminderService = require('./Services/ReminderService');

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

app.post("/new-reminder", async (req, res) => {
    addNewReminder(req.body)
        .then(result => res.send(result))
        .catch(err => res.send(err));
})

app.listen(8000, () => {
    console.log("Example app listening on port 8000");
});