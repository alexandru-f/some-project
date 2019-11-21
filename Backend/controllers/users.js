const User = require('../models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Reminder = require('../models/reminder');
const { Validator } = require('node-input-validator');

exports.register_user = (req, res, next) => {

    const validator = new Validator(req.body, {
        email: 'required|email',
        password: 'required|lengthBetween:6,30'
    });

    validator.check().then((matched) => {
        if (!matched) {
            return res.status(422).send(validator.errors);
        }
    });

    User.find({email: req.body.email})
    .exec()
    .then(user => {
        if (user.length >= 1) {
            return res.status(409).json({
                message: "E-mail is already used"
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
                        message: "User has been successfully created"
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    });
                });
            })
        }
    })
}
exports.login_user = (req, res, next) => {
    User.find({email: req.body.email})
    .exec()
    .then(user => {
        if (user.length < 1) {
            return res.status(401).json({
                    other: {
                        message: "Email or password is incorect."
                    }
            });
        } else {
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        errors: {
                            other: {
                                message: "Email or password is incorect."
                            }
                        }
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
}

exports.delete_user = (req, res, next) => {
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
}