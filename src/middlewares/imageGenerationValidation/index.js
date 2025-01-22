const CONFIG = require('./config');
const { DEFAULT_AMOUNT, MAX_RETURNED_IMAGES, ERRORS } = CONFIG;

function isInValidRange(amountOfImages) {
  return amountOfImages >= 0 && amountOfImages > MAX_RETURNED_IMAGES;
}

function amountOfImagesValidation(req, res, next) {
  const { amountOfImages } = req.query;
  const { STATUS_CODE, INVALID_INPUT, TOO_MANY_IMAGES_REQUESTED } = ERRORS;

  const validatedAmountOfImages = amountOfImages === undefined ? DEFAULT_AMOUNT : parseInt(amountOfImages);

  if (isNaN(validatedAmountOfImages)) return res.status(STATUS_CODE).send(INVALID_INPUT);
  if (!isInValidRange(validatedAmountOfImages)) return res.status(STATUS_CODE).send(TOO_MANY_IMAGES_REQUESTED);

  req.validatedAmountOfImages = validatedAmountOfImages;

  next();
}

module.exports = {
  amountOfImagesValidation
};