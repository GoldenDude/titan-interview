const { NODE_ENV } = process.env;
const env = NODE_ENV && NODE_ENV !== 'test' ? NODE_ENV : 'staging';
module.exports = require(`./${env}`);
