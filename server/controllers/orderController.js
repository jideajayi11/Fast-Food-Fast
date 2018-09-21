import order from '../models/orderModel';

class Order {
  static getOrders(req, res, next) {
    if (order.length) {
      return res.status(200).json({
        order,
        status: 'success',
        message: 'Retrieved all your orders',
      });
    }

return res.status(404).json({
        error: 404,
        message: 'Not found',
      });
  }

  static getOrder(req, res, next) {
    const id = req.params.id;
    const orderItem = order.filter(item => item.id == id);
    if (orderItem.length == 1) {
      return res.status(200).json({
        order: orderItem[0],
        status: 'success',
        message: 'Order found',
      });
    }

return res.status(404).json({
        error: 404,
        message: 'Not found',
      });
  }

  static addOrder(req, res, next) {
    const lastId = order[order.length - 1].id;
    const orderItem = {
      id: lastId + 1,
      userId: req.body.userId,
      food: {
        id: req.body.foodId,
        description: req.body.foodDescription,
        imageURL: req.body.foodImageURL,
        price: req.body.foodPrice,
      },
      quantity: req.body.quantity,
      orderStatus: 'pending',
      date: Date(),
    };
    order.push(orderItem);

    return res.status(201).json({
      id: lastId + 1,
      userId: req.body.userId,
      food: {
        id: req.body.foodId,
        description: req.body.foodDescription,
        imageURL: req.body.foodImageURL,
        price: req.body.foodPrice,
      },
      quantity: req.body.quantity,
      orderStatus: 'pending',
      date: Date(),
      status: 'success',
      message: 'Order Added',
    });
  }

  static updateOrder(req, res, next) {
    const id = req.params.id;
    const index = order.findIndex(item => item.id == id);
    order.splice(index, 1, {
      id: order[index].id,
      userId: order[index].userId,
      food: {
        id: order[index].food.id,
        description: order[index].food.description,
        imageURL: order[index].food.imageURL,
        price: order[index].food.price,
      },
      quantity: order[index].quantity,
      orderStatus: req.body.orderStatus,
      date: order[index].date,
    });

    return res.status(200).json({
      id: order[index].id,
      userId: order[index].userId,
      food: {
        id: order[index].food.id,
        description: order[index].food.description,
        imageURL: order[index].food.imageURL,
        price: order[index].food.price,
      },
      quantity: order[index].quantity,
      orderStatus: order[index].orderStatus,
      date: order[index].date,
      status: 'success',
      message: 'Order Updated',
    });
  }
}
export default Order;