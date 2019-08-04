const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');
const Reminder = require('../models/reminder');

const  RemindersController = require("../controllers/reminders");

// Get all reminders from user
router.get("/", checkAuth,  RemindersController.get_all_reminders);

// Add new reminder for user
router.post('/', (req, res, next) => {
    const newReminder = {
        reminders: {
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            type: req.body.type,
            startDate: req.body.startDate,
            endDate: req.body.endDate
        }
    }
    Reminder.update(
        {userID: "1"},
        {$push: newReminder},
        {new:true, runValidators: true}
    ).then(result => {
        res.status(201).json({
            message: 'Created reminder succesfully',
            createdReminder: {
                _id: newReminder.reminders._id,
                name: newReminder.reminders.name,
                type: newReminder.reminders.type,
                startDate: newReminder.reminders.startDate,
                endDate: newReminder.reminders.endDate,
                request: {
                    type: 'GET',
                    url: 'http://localhost:8000/reminders/' + newReminder.reminders._id
                }
            }
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    });
});

// Get all reminders with type from user
router.get("/type/:reminderType", (req, res, next) => {

    const reminderType = req.params.reminderType;
    const userID = "1";

    Reminder.findOne({'userID': userID})
    .exec() 
    .then(doc => {
        remindersRes = [];
        doc.reminders.find(function(element){
            if(element.type == reminderType)
                remindersRes.push(element);
        });
        if(remindersRes.length > 0) {
            res.status(200).json(remindersRes);
        } else {
            res.status(404).json({
                message: 'No valid entry found for provided Type'
            });
        }
    })
    .catch(err => {
        res.status(500).json({error: err});
    });
});

// Get reminder by ID from user
router.get("/:reminderID", (req, res, next) => {

    const reminderID = req.params.reminderID;
    const userID = "1";

    Reminder.findOne({'userID': userID})
    .exec() 
    .then(doc => {
        var remindersRes = null;
        doc.reminders.find(function(element){
            if(element._id == reminderID)
                remindersRes = element;
        });
        if(remindersRes) {
            res.status(200).json(remindersRes);
        } else {
            res.status(404).json({
                message: 'No valid entry found for provided ID'
            });
        }
    })
    .catch(err => {
        res.status(500).json({error: err});
    });
});
// Update reminder by user ID and reminder ID

router.patch("/:reminderID", (req, res, next) => {
    const id = req.params.reminderID;
    const userID = 1;
    const updateOps = {};

    for (const ops of req.body) {
        updateOps['reminders.$.' + ops.propName] = ops.value;
    }

    Reminder.findOneAndUpdate(
        {"userID": userID, "reminders._id": id},
        { "$set":  updateOps },
        { new: true }
    )
    .then(result => {
        res.status(200).json({
            message: 'Reminder updated',
            request: {
                type: 'GET',
                url: 'http://localhost:8000/reminders/' + id
            }
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    });
});

// Delete reminder by user ID and reminder ID
router.delete("/:reminderID", (req, res, next) => {
    const id = req.params.reminderID;
    const userID = 1;

    Reminder.update(
        {"userID": userID},
        {$pull: { reminders: { _id : id }}},
        {safe: true}
    ).then(result => {
        res.status(200).json({
            message: 'Reminder deleted',
            request: {
                type: 'GET',
                url: 'http://localhost:8000/reminders'
            }
        });
    })
    .catch(err => { 
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;