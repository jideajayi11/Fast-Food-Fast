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
    const id = req.params.id;
    const index = order.findIndex(item => item.id == id);
    const orderItem = {
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
    };
    order.splice(index, 1, orderItem);

    return res.status(200).json({
      order: orderItem,
      status: 'success',
      message: 'Order Updated',
    });
  }
}
export default Order;
