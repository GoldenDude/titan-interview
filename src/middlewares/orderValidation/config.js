const CONFIG = {
  emailValidationRegex: new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
  ERRORS: {
    STATUS_CODE: 400,
    USER: 'User parameter is missing or invalid',
    ID: 'Order ID parameter is missing or invalid',
    EMAIL: 'Email parameter is missing or invalid',
    FULL_NAME: 'Full Name parameter is missing or invalid',
    FULL_ADDRESS: 'Full Address parameter is missing or invalid',
    IMAGES: 'Images array is missing or contains invalid values',
    FRAME_COLOR: 'Frame Color parameter is missing or invalid',
  }
};

module.exports = CONFIG;