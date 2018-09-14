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
      return res.status(400).json({
        error: 400,
        message: 'Incomplete parameters'
      });
    }
  }

}
export default Order;