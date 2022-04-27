'use strict'

const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
  text: { type: String, required: true },
  notes: { type: String, required: true },
  complete: { type: Boolean, default: false },
  priority: { type: String, default: "None", enum: ['High !!!', 'Medium !!', 'Low !', 'None'] }
});

const todoModel = mongoose.model('todo', todoSchema);

module.exports = todoModel;