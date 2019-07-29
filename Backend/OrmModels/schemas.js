const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;



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
    name: String
});

module.exports = {
    reminderSchema: ReminderItemSchema,
    userSchema: UserSchema
};
