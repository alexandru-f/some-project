const Models = require('../OrmModels/models');

const reminderModel = Models.reminderModel; 

async function addNewReminder(data) {
    const newReminder = data;
    const mydata = { 
        reminders: {
            reminderType: newReminder.reminderType,
            reminderName: newReminder.reminderName,
            startDate: newReminder.startDate,
            endDate: newReminder.endDate
        }
    }
    var result = await reminderModel.update(
        {userID: newReminder.UID},
        {$push: mydata}
    );
    return result;
}

module.exports = {
    addReminder: addNewReminder
}