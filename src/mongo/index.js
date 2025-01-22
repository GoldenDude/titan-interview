const mongoose = require('mongoose');
const { MONGO_URI } = require('../config');

const handleError = e => {
  console.log(e.message);
  console.log('failed to connect mongo on app startup - won\'t try again, please restart application.');
};

mongoose.connect(MONGO_URI).catch(handleError);

module.exports = mongoose;