const Mongoose = require('mongoose');
const Schemas = require('./schemas');

const reminderSchema = Schemas.reminderSchema;
const userSchema = Schemas.userSchema;

const ReminderItemModel = Mongoose.model("reminderItem", reminderSchema);

const UserModel = Mongoose.model("user", userSchema);

module.exports = {
    reminderModel: ReminderItemModel,
    userModel: UserModel
};
