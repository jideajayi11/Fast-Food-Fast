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
    if(req.body.userId == '' || req.body.foodId == '' ||
     req.body.price == '' || req.body.quantity == '') {
      return res.status(400).json({
        status: 'error',
        message: 'Incomplete parameters'
      });
    }else {
      const lastId = order[order.length - 1].id;
      const orderItem = {
        id: lastId + 1,
        userId: req.body.userId,
        foodId: req.body.foodId,
        price: req.body.price,
        quantity: req.body.quantity,
        status: 'pending',
        date: Date()
      };
      order.push(orderItem);
      return res.status(201).json({
        order,
        status: 'success',
        message: 'Order Added'
      });
    }
  }

}
export default Order;