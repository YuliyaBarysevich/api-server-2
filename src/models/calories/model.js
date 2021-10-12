'use strict'

const mongoose = require('mongoose');

const caloriesSchema = mongoose.Schema({
  weight: { type: String, required: true },
  height: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true, enum: ['male', 'female'] }
});

const caloriesModel = mongoose.model('calories', caloriesSchema);

module.exports = caloriesModel;