import { Mongoose } from "mongoose";

export const ReminderItem = Mongoose.model("reminderItem", {
    reminderName: String
});
