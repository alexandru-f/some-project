const express = require('express');
const app = express();
const Mongoose = require('mongoose');
const BodyParser = require('body-parser');

// import {ReminderItem} from "./OrmModels/index";
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended: true}));

//Connect to DB

Mongoose.connect('mongodb://localhost:27017');

Mongoose.connection.once('open', function(){
    console.log('Connection has been made.');
}).on('error', function(error){
    console.log('Connection error: ', error);
});

//End of Connect to DB
const ReminderItemModel = Mongoose.model("reminderItem", {
    userID: String,
    masina: [{reminderName: String}],
    casa: [{reminderName: String}]
});

const UserModel = Mongoose.model("user", {
    name: String
});

app.post("/new-user", async (req, res) => {
    try {
        var newUser = new UserModel(req.body);
        var result = await newUser.save(function(err, userData) {
            var reminderItem = new ReminderItemModel({userID: userData._id});
            reminderItem.save();
        });
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.post("/new-reminder", async (req, res) => {
    try{
        const newReminder = req.body;
        var result = await ReminderItemModel.update(
            {userID: newReminder.UID},
            {$push: newReminder}
        )
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
})

app.listen(8000, () => {
    console.log("Example app listening on port 8000");
});