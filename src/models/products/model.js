'use strict'

const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true, enum: ['Makeup', 'Skin Care', 'Hair', 'Fragrance', 'Bath & Body'] },
  price: { type: Number, required: true },
  description: { type: String, required: true, default: 'Here is description' },
  miniDescription: { type: String, required: true, default: 'Description goes here'},
  url: { type: String, default: 'https://tracerproducts.com/wp-content/uploads/2019/12/Product-Image-Coming-Soon.jpg' },
  url2: {type: String, default: 'https://tracerproducts.com/wp-content/uploads/2019/12/Product-Image-Coming-Soon.jpg'},
  url3: {type: String, default: 'https://tracerproducts.com/wp-content/uploads/2019/12/Product-Image-Coming-Soon.jpg'},
  total: { type: Number, default: 0 },
  inStock: { type: Number, default: 5 }
});

const productsModel = mongoose.model('products', productSchema);

module.exports = productsModel;