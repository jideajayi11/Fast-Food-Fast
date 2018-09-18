import order from '../models/orderModel';

class Order {
  static getOrders(req, res, next) {
    if( order.length ) {
      return res.status(200).json({
        order,
        status: 'success',
        message: 'Retrieved all your orders'
      });
    }else {
      return res.status(404).json({
        error: 404,
        message: 'Not found'
      });
    }
  }
  
  static getOrder(req, res, next) {
    const id = req.params.id;
    const orderItem = order.filter((item) => {
      return item.id == id;
    });
    if( orderItem.length == 1 ) {
      return res.status(200).json({
        orderItem,
        status: 'success',
        message: 'Order found'
      });
    }else {
      return res.status(404).json({
        error: 404,
        message: 'Not found'
      });
    }
  }
  
  static addOrder(req, res, next) {
    if(req.body.userId === '' || req.body.foodId === '' ||
     req.body.foodDescription === '' || req.body.foodImageURL === '' || 
     req.body.foodPrice === '' || req.body.quantity === '' ||
     req.body.userId === undefined || req.body.foodId === undefined ||
     req.body.foodDescription === undefined || req.body.foodImageURL === undefined ||
     req.body.foodPrice === undefined || req.body.quantity === undefined) {
      return res.status(400).json({
        status: 'error',
        message: 'Incomplete parameters'
      });
    }else {
      const lastId = order[order.length - 1].id;
      const orderItem = {
        id: lastId + 1,
        userId: req.body.userId,
        food: {
          id: req.body.foodId,
          description: req.body.foodDescription,
          imageURL: req.body.foodImageURL,
          price: req.body.foodPrice
        },
        quantity: req.body.quantity,
        orderStatus: 'pending',
        date: Date()
      };
      order.push(orderItem);
      return res.status(201).json({
        id: lastId + 1,
        userId: req.body.userId,
        food: {
          id: req.body.foodId,
          description: req.body.foodDescription,
          imageURL: req.body.foodImageURL,
          price: req.body.foodPrice
        },
        quantity: req.body.quantity,
        orderStatus: 'pending',
        date: Date(),
        status: 'success',
        message: 'Order Added'
      });
    }
  }

  static updateOrder(req, res, next) {
    const id = req.params.id;
    const index = order.findIndex((item) => {
      return item.id == id;
    });
    if(req.body.orderStatus == 'pending' || req.body.orderStatus == 'accepted' ||
     req.body.orderStatus == 'declined' || req.body.orderStatus == 'completed') {
      order.splice(index, 1, {
        id: order[index].id,
        userId: order[index].userId,
        foodId: order[index].foodId,
        price: order[index].price,
        quantity: order[index].quantity,
        orderStatus: req.body.orderStatus,
        date: order[index].date
      });
      return res.status(200).json({
        id: order[index].id,
        userId: order[index].userId,
        foodId: order[index].foodId,
        price: order[index].price,
        quantity: order[index].quantity,
        orderStatus: order[index].orderStatus,
        date: order[index].date,
        status: 'success',
        message: 'Order Updated'
      });
    }else {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid Status'
      });
    }
  }

}
export default Order;