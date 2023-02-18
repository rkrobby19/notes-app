const mongoose = require("mongoose");

const { Schema } = mongoose;

const noteSchema = new Schema({
  title: String,
  tags: Array,
  body: String,
  createdAt: Date,
  updatedAt: Date,
});

const Note = mongoose.model("Notes", noteSchema);

module.exports = Note;
