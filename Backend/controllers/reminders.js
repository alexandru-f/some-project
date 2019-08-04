const Reminder = require('../models/reminder');
const mongoose = require('mongoose');

exports.get_all_reminders = (req, res, next) => {
    const userID = req.userData.userId;

    Reminder.findOne({'userID': userID})
        .select('reminders.name reminders.type reminders._id reminders.startDate reminders.endDate')
        .exec()
        .then(docs => {
            const reminders = docs.reminders;
            if (reminders.length > 0){
                const response = {
                    count: reminders.length,
                    reminders: reminders.map(reminder => {
                        return {
                            _id: reminder._id,
                            name: reminder.name,
                            type: reminder.type,
                            startDate: reminder.startDate,
                            endDate: reminder.endDate,
                            request: {
                                type: 'GET',
                                url: 'http://localhost:8000/reminders/' + reminder._id
                            }
                        }
                    })
                };
                res.status(200).json(response);
            }
            else 
                res.status(404).json({
                    message: 'No reminders found for provided userID'
                })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
}

exports.add_new_reminder = (req, res, next) => {
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
        {userID: req.userData.userId},
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
};

exports.get_reminders_by_type = (req, res, next) => {
    const reminderType = req.params.reminderType;
    const userID = req.userData.userId;

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
};

exports.get_reminder_by_id = (req, res, next) => {
    const reminderID = req.params.reminderID;
    const userID = req.userData.userId;

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
};

exports.update_reminder = (req, res, next) => {
    const id = req.params.reminderID;
    const userID = req.userData.userId;
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
};

exports.delete_reminder = (req, res, next) => {
    const id = req.params.reminderID;
    const userID = req.userData.userId;

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
}