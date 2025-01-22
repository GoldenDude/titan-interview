const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
  _id: String,
  email: String,
  fullName: String,
  frameColor: String,
  fullAddress: String,
  images: [String],
  user: { type: String, index: true },
}, { collection: 'orders' });

const model = mongoose.model('orders', schema);

module.exports = model;