const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');
const Reminder = require('../models/reminder');

const  RemindersController = require("../controllers/reminders");

// Get all reminders from user
router.get("/", checkAuth,  RemindersController.get_all_reminders);

// Add new reminder for user
router.post("/", checkAuth, RemindersController.add_new_reminder);

// Get all reminders by type from user
router.get("/type/:reminderType", checkAuth, RemindersController.get_reminders_by_type);

// Get reminder by ID from user
router.get("/:reminderID", checkAuth, RemindersController.get_reminder_by_id);

// Update reminder by user ID and reminder ID
router.patch("/:reminderID", checkAuth, RemindersController.update_reminder);

// Delete reminder by user ID and reminder ID
router.delete("/:reminderID", checkAuth, RemindersController.delete_reminder);

module.exports = router;