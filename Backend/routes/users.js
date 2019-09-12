
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require("../models/user");
const Reminder = require("../models/reminder");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const  UsersController = require("../controllers/users");

//Register a user
router.post("/register", UsersController.register_user);

//Login a user
router.post("/login", UsersController.login_user);

//Delete a user
router.delete("/:userId", UsersController.delete_user);

module.exports = router; 