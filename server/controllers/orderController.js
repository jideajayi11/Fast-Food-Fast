import order from '../models/orderModel';
import db from '../helpers/db';

class Order {
  static getOrders(req, res, next) {
    db.query(`SELECT users.fullname, users.phonenumber, 
    users.deliveryAddress, food.foodname, food.imageURL, 
    orders.price, orders.quantity, orders.id, orders.orderstatus 
    FROM users, food, orders WHERE orders.userid = users.id 
    AND orders.foodid = food.id AND orders.adminid = $1`,
      [req.decoded.adminId])
    .then((data) => { 
      return res.status(200).json({
        orders: data.rows,
        status: 'success',
        message: 'Orders found'
      });
      
    });
  }

  static getUserOrders(req, res, next) {
    db.query(`SELECT admin.restaurantname, admin.phonenumber, 
    food.foodname, food.imageURL, orders.price, orders.quantity, 
    orders.orderstatus FROM admin, food, orders 
    WHERE orders.adminid = admin.id AND orders.foodid = food.id 
    AND orders.userid = $1`,
			[req.params.userId])
		.then((data) => {
			return res.status(200).json({
				orders: data.rows,
				status: 'success',
				message: 'Orders found'
			});
    })
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
    db.query(`update orders set  orderstatus = $1
     where id = $2 AND adminId = $3 RETURNING *`,
      [req.body.orderStatus, req.params.orderId, req.decoded.adminId])
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
  static cancelOrder (req, res, next) {
    db.query(`update orders set  orderstatus = $1
     where id = $2 AND userId = $3 AND orderstatus = $4 RETURNING *`,
      ['Cancelled', req.params.orderId, req.decoded.userId, 'New'])
    .then((data) => {
      if(data.rows[0]) {
        return res.status(200).json({
          status: 'success',
          message: 'Order was cancelled'
        });
      }
      return res.status(404).json({
        status: 'error',
        message: 'Order not found'
      });
    })
  }
	
}
export default Order;
