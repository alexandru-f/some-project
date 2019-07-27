const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;



const ReminderItemSchema = new Schema({
    userID: String,
    masina: [
        {
            startDate: Date,
            endDate: Date,
            reminderName: String
        }
    ],
    casa: [
        {
            startDate: Date,
            endDate: Date,
            reminderName: String
        }
    ],
    others: [
        {
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
