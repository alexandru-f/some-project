const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const ReminderItemSchema = new Schema({
    userID: String,
    reminders: [
        {
            reminderType: String,
            startDate: Date,
            endDate: Date,
            reminderName: String
        }
    ]
});

const UserSchema = new Schema({
    email: String
});

module.exports = {
    reminderSchema: ReminderItemSchema,
    userSchema: UserSchema
};
