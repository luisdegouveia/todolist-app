// models/task.js

const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const taskSchema = new Schema({
  title: String,
  description: String,
  author: String,
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;