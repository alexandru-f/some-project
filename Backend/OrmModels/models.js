const mongoose = require('mongoose');
const Schemas = require('./schemas');

const reminderSchema = Schemas.reminderSchema;
const userSchema = Schemas.userSchema;

const ReminderItemModel = mongoose.model("reminderItem", reminderSchema);

const UserModel = mongoose.model("user", userSchema);

module.exports = {
    reminderModel: ReminderItemModel,
    userModel: UserModel
};
