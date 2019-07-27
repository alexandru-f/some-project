const Models = require('../OrmModels/models');

const userModel = Models.userModel;
const reminderModel = Models.reminderModel; 

async function registerNewUser(user) {
    var newUser = new userModel(user);
    const userData = await newUser.save();
    var reminderItem = new reminderModel({userID: userData._id});
    const itemData = await reminderItem.save();
    const result = { user: userData, item: itemData};
    return result;
}

module.exports = {
    registerUser: registerNewUser
}