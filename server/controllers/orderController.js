import order from '../models/orderModel';
import db from '../helpers/db';

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
		db.query('select adminid, price from food where id = $1',
			[req.body.foodId])
		.then((data) => {
      db.query(`INSERT INTO orders(quantity, foodId, price, adminId, userId, orderStatus)
       VALUES($1, $2, $3, $4, $5, $6)`,
      [req.body.quantity, req.body.foodId, data.rows[0].price, data.rows[0].adminid,
        req.decoded.userId, 'New'])
      .then((data2) => {
        return res.status(201).json({
          status: 'success',
          messsage: 'Order Created'
        });
      })
    })
    .catch(() => {
      return res.status(404).json({
        status: 'error',
        messsage: 'Food not found'
      });
    });
  }

  static updateOrder(req, res, next) {
    db.query('update orders set  orderstatus = $1 where id = $2 RETURNING *',
      [req.body.orderStatus, req.params.orderId])
    .then((data) => {
      if(data.rows[0]) {
        return res.status(200).json({
          status: 'success',
          messsage: 'Order was updated'
        });
      } else {
        return res.status(404).json({
          status: 'error',
          messsage: 'Order not found'
        });
      }
    });
  }
}
export default Order;
