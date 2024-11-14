const mongoose = require("mongoose");
const { Schema } = mongoose;
const { DateTime } = require("luxon");

// Task Schema (Subdocument)
const taskSchema = new Schema({
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ["not started", "in progress", "completed"],
    default: "Not Started",
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
  },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

taskSchema.virtual("due_back_formatted").get(function () {
  return DateTime.fromJSDate(this.dueDate).toLocaleString(DateTime.DATE_MED);
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
