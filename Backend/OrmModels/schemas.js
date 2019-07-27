const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const ReminderItemSchema = new Schema({
    userID: String,
    masina: [{reminderName: String}],
    casa: [{reminderName: String}]
});

const UserSchema = new Schema({
    name: String
});

module.exports = {
    reminderSchema: ReminderItemSchema,
    userSchema: UserSchema
};
