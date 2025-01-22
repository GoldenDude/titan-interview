const { v1: uuid } = require('uuid');
const ordersModel = require('../../mongo/models/Orders');

async function getOrdersByUser(user) {
  const orders = await ordersModel.find({ user });
  return orders;
}

async function insertOrder(order) {
  const _id = uuid();
  const result = await ordersModel.create({ _id, ...order });
  return result;
}

async function deleteOrdersByUser(user) {
  await ordersModel.deleteMany({ user });
}

module.exports = {
  getOrdersByUser,
  insertOrder,
  deleteOrdersByUser,
};