const mongoose = require('mongoose');

const reminderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true},
    type: { type: String, required: true},
    startDate: { type: Date, required: true},
    endDate: { type: Date, required: true}
});

const reminderListSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: { type: String, required: true},
    reminders: { type: [reminderSchema], required: true}
});

module.exports = mongoose.model('Reminder', reminderListSchema);