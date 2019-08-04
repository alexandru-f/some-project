
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require("../models/user");
const Reminder = require("../models/reminder");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.post("/register", (req, res, next) => {
    User.find({email: req.body.email})
    .exec()
    .then(user => {
        if (user.length >= 1) {
            return res.status(409).json({
                message: "Email-ul este deja folosit"
            });
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                } else {
                    var user = new User({
                        _id : new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                    }); 
                }
                user
                .save()
                .then(result => {
                    console.log(result);
                    var reminderItem = new Reminder({_id: new mongoose.Types.ObjectId(), userID: result._id});
                    reminderItem.save();
                    res.status(201).json({
                        message: "Userul a fost creat"
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });
            })
        }
    })
});

router.post("/login", (req, res, next) => {
    User.find({email: req.body.email})
    .exec()
    .then(user => {
        if (user.length < 1) {
            return res.status(401).json({
                message: "Autentificarea a esuat"
            });
        } else {
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: "Autentificarea a esuat"
                    });
                }
                if (result) {
                    const token = jwt.sign(
                        {
                            email: user[0].email,
                            userId: user[0]._id
                        }, 
                        process.env.JWT_KEY, 
                    );
                    return res.status(200).json({
                        message: "Autentificare efectuata cu success",
                        token: token
                    });
                }
                return res.status(401).json({
                    message: "Autentificarea a esuat"
                });
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.delete("/:userId", (req, res, next) => {
    User.remove({_id: req.params.userId})
    .exec()
    .then( result => {
        res.status(200).json({
            message: "Userul a fost sters"
        });
    }
    ).catch( err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router; 