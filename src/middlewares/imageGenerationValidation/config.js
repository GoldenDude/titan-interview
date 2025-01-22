const CONFIG = {
  DEFAULT_AMOUNT: 25,
  MAX_RETURNED_IMAGES: 500,
  ERRORS: {
    STATUS_CODE: 400,
    TOO_MANY_IMAGES_REQUESTED: 'Amount of images requested needs to be an unsigned integer <= 500',
    INVALID_INPUT: 'Amount of images requested is invalid, please make sure to send an unsigned integer'
  }
};

module.exports = CONFIG;