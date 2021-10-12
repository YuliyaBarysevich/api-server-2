'use strict'

const mongoose = require('mongoose');

const caloriesSchema = mongoose.Schema({
  weight: { type: String },
  height: { type: String },
  age: { type: String },
  gender: { type: String, default: "Male", enum: ['Male', 'Female'] }
});

const caloriesModel = mongoose.model('calories', caloriesSchema);

module.exports = caloriesModel;