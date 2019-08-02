const express = require('express');
const router = express.Router();

router.get("/", (req, res, next) => {

    res.status(200).json({
        message: 'Handling get request on /products'
    });

});

router.get("/:reminderType", (req, res, next) => {
    const reminderType = req.params.reminderType;
    //const userId = "12345";
    
    const reminder = {
        userId: req.body.userId,
        reminderType: reminderType
    };
    console.log(reminder.reminderType);
    res.status(201).json({
        message: "Handling reminderType get",
        userId: reminder.userId,
        reminderType: reminder.reminderType
    });

});

module.exports = router;