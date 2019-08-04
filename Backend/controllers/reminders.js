const Reminder = require('../models/reminder');

exports.get_all_reminders = (req, res, next) => {
    const userID = "1";
    console.log("userdata: " + req.userData);
    Reminder.findOne({'userID': userID})
        .select('reminders.name reminders.type reminders._id reminders.startDate reminders.endDate')
        .exec()
        .then(docs => {
            const reminders = docs.reminders;
            
            if (reminders.length > 0){
                const response = {
                    count: reminders.length,
                    reminders: reminders.map(reminder => {
                        return {
                            _id: reminder._id,
                            name: reminder.name,
                            type: reminder.type,
                            startDate: reminder.startDate,
                            endDate: reminder.endDate,
                            request: {
                                type: 'GET',
                                url: 'http://localhost:8000/reminders/' + reminder._id
                            }
                        }
                    })
                };
                res.status(200).json(response);
            }
            else 
                res.status(404).json({
                    message: 'No reminders found for provided userID'
                })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
}