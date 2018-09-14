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
    //console.log(order);
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

}
export default Order;