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
    const addOrderQuery = {
      text: `INSERT INTO orders(quantity, price, userId, adminId, foodId, orderStatus)
       VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,
      values: [req.body.quantity, req.body.foodPrice, req.body.userId,
        req.body.adminId, req.body.foodId, 'new']
    };
    db.query(addOrderQuery)
      .then((data) => {
        const orderItem = {
          id: data.rows[0].id,
          userId: data.rows[0].userid,
          foodId: data.rows[0].foodid,
          adminId: data.rows[0].adminid,
          price: data.rows[0].price,
          quantity: data.rows[0].quantity,
          orderStatus: data.rows[0].orderstatus,
          date: data.rows[0].date,
        };
        return res.status(201).json({
          order: orderItem,
          status: 'success',
          message: 'Order Added',
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
