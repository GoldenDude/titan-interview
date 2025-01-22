const env = process.env;

const MONGO_URI = env.MONGO_URI;
const PIXABAY_API_KEY = env.PIXABAY_API_KEY;

module.exports = {
  MONGO_URI,
  PIXABAY_API_KEY
};
