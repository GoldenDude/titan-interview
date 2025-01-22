const express = require('express');
const router = express.Router();
const imageGeneratorCtrl = require('../controllers/imageGenerator');
const { amountOfImagesValidation } = require('../middlewares/imageGenerationValidation');

router.get('/', amountOfImagesValidation, async (req, res) => {
  try {
    const { validatedAmountOfImages } = req;
    const result = await imageGeneratorCtrl.generateImages(validatedAmountOfImages);
    
    res.json(result);
  } catch (e) {
    console.error(e);
    res.status(500).json(e); // sending error stack in dev env is fine, not in prod.
  }
});

module.exports = router;