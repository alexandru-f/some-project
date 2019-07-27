const Models = require('../OrmModels/models');

const reminderModel = Models.reminderModel; 

async function addNewReminder(data) {
    const newReminder = data;
    var result = await reminderModel.update(
        {userID: newReminder.UID},
        {$push: newReminder}
    );
    return result;
}

module.exports = {
    addReminder: addNewReminder
}