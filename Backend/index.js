const express = require('express');
const app = express();
const Mongoose = require('mongoose');
const BodyParser = require('body-parser');

// import {ReminderItem} from "./OrmModels/index";
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended: true}));

//Connect to DB

Mongoose.connect('mongodb://heroku_31h15hl0:6rb13lp45ubdrm3qs5ildphn1l@ds351807.mlab.com:51807/heroku_31h15hl0');

Mongoose.connection.once('open', function(){
    console.log('Connection has been made.');
}).on('error', function(error){
    console.log('Connection error: ', error);
});

//End of Connect to DB
const ReminderItemModel = Mongoose.model("reminderItem", {
    reminderName: String
});

app.post("/reminder-item", async (req, res) => {
    try {
        var reminderItem = new ReminderItemModel(req.body);
        var result = await reminderItem.save();
        res.send(result);
        
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(8000, () => {
    console.log("Example app listening on port 8000");
});