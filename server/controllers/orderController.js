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
		let order;
    db.query('select * from orders where id = $1',
			[req.params.orderId])
		.then((data1) => {
      order = data1.rows[0];

      db.query(`select fullName, phoneNumber, deliveryAddress 
      from users where id = $1`, [order.userid])
      .then((data) => {
        order = {
          id: order.id,
          quantity: order.quantity,
          price: order.price,
          user: {
            fullName: data.rows[0].fullname,
            phoneNumber: data.rows[0].phonenumber,
            deliveryAddress: data.rows[0].deliveryaddress
          },
          orderstatus: order.orderstatus,
          date: order.date,
          foodid: order.foodid
        };
      });
      db.query('select foodName, imageURL from food where id = $1',
        [order.foodid])
      .then((data) => {
        order = {
          id: order.id,
          food: {
            quantity: order.quantity,
            price: order.price,
            foodName: data.rows[0].foodname,
            imageURL: data.rows[0].imageurl
          },
          user: order.user,
          orderstatus: order.orderstatus,
          date: order.date
        };
        return res.status(200).json({
          order,
          status: 'success',
          message: 'Order found',
        });
      });
		})
    .catch(() => {
      return res.status(404).json({
        status: 'error',
        message: 'Order not found'
      });
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
          message: 'Order Created'
        });
      })
    })
    .catch(() => {
      return res.status(404).json({
        status: 'error',
        message: 'Food not found'
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
          message: 'Order was updated'
        });
      } else {
        return res.status(404).json({
          status: 'error',
          message: 'Order not found'
        });
      }
    });
  }
}
export default Order;
