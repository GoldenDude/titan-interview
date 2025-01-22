const CONFIG = {
  MAX_ASYNC_CALLS: 5,
  PAGE_MAX_IMAGES: 100,
  PAGE_TTL: 1000 * 60 * 60 * 24, // 24 hours in MS
  TOO_MANY_REQUESTS_STATUS_CODE: 429,
  ENDPOINTS: {
    GENERATE_IMAGES: 'https://pixabay.com/api/',
  }
};

module.exports = CONFIG;