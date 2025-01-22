const CONFIG = require('./config');
const { ERRORS } = CONFIG;
const orderValidations = {
  email: { validationFunction: isEmailValid, error: ERRORS.EMAIL },
  fullName: { validationFunction: isValidString, error: ERRORS.FULL_NAME },
  fullAddress: { validationFunction: isValidString, error: ERRORS.FULL_ADDRESS },
  images: { validationFunction: isValidStringArray, error: ERRORS.IMAGES },
  frameColor: { validationFunction: isValidString, error: ERRORS.FRAME_COLOR },
  user: { validationFunction: isValidString, error: ERRORS.USER },
};

function isEmailValid(input) {
  const { emailValidationRegex } = CONFIG;
  return emailValidationRegex.test(input);
}

function isValidStringArray(stringArray) {
  if (!Array.isArray(stringArray)) return false;

  return stringArray.every(entry => isValidString(entry));
}

function isValidString(input) {
  if (!input) return false;
  if (typeof input !== 'string') return false;

  return true;
}

function userValidation(req, res, next) {
  const { user } = req.query;
  const isValid = isValidString(user);

  if (!isValid) return res.status(ERRORS.STATUS_CODE).send(ERRORS.USER);

  next();
}

function orderValidation(req, res, next) {
  const order = req.body;

  for (const key in orderValidations) {
    const value = order[key];
    const { validationFunction, error } = orderValidations[key];
    const isValid = validationFunction(value);

    if (!isValid) return res.status(ERRORS.STATUS_CODE).send(error);
  }

  next();
}

module.exports = {
  userValidation,
  orderValidation,
};