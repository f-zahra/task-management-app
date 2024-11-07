const mongoose = require("mongoose");
const { Schema } = mongoose;

// Task Schema (Subdocument)
const taskSchema = new Schema({
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ["Not Started", "In Progress", "Completed"],
    default: "Not Started",
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Medium",
  },
});

// User Schema (Parent Document)
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  tasks: [taskSchema], // Embed an array of task subdocuments
});

const User = mongoose.model("User", userSchema);

module.exports = User;
