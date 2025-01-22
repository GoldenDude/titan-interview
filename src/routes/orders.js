const express = require('express');
const router = express.Router();
const ordersCtrl = require('../controllers/orders');
const { userValidation, orderValidation } = require('../middlewares/orderValidation');

router.get('/getOrdersByUser', userValidation, async (req, res) => {
  try {
    const { user } = req.query;
    const result = await ordersCtrl.getOrdersByUser(user);
    res.json(result);
  } catch (e) {
    console.error(e);
    res.status(500).json(e);
  }
});

router.post('/', orderValidation, async (req, res) => {
  try {
    const result = await ordersCtrl.insertOrder(req.body);
    res.json(result);
  } catch (e) {
    console.error(e);
    res.status(500).json(e);
  }
});

router.delete('/deleteOrdersByUser', userValidation, async (req, res) => {
  const { user } = req.query;

  try {
    const result = await ordersCtrl.deleteOrdersByUser(user);
    res.json(result);
  } catch (e) {
    console.error(e);
    res.status(500).json(e);
  }
});

module.exports = router;