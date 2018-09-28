import order from '../models/orderModel';
import db from '../helpers/db';

class Order {
  static getOrders(req, res, next) {
    db.query('SELECT * FROM orders where adminId = $1',
      [1])
    .then((data) => {
      if(data.rows) {
				data.rows.map((value, index, arr) => {
					db.query('SELECT fullName, phoneNumber, deliveryAddress FROM users where id = $1',
					[value.userid])
					.then((data2) => {
						arr[index] = {
							id: value.id,
							quantity: value.quantity,
							price: value.price,
							user: {
								name: data2.rows[0].fullname,
								phoneNumber: data2.rows[0].phonenumber,
								deliveryAddress: data2.rows[0].deliveryaddress
							},
							orderstatus: value.orderstatus,
							date: value.date,
							foodid: value.foodid
						};
					});
				});
				
        return res.status(200).json({
          order: data.rows,
          status: 'success',
          messsage: 'Retrieved all your orders'
        });
      } else {
        return res.status(404).json({
          status: 'error',
          messsage: 'Order not found'
        });
      }
    });
		db.query('SELECT foodName, imageURL FROM food where id = $1',
		[value.foodid])
		.then((data2) => {
			value = {
				id: value.id,
				food: {
					quantity: value.quantity,
					price: value.price,
					foodName: data2.rows[0].foodname,
					imageURL: data2.rows[0].imageurl
				},
				user: value.user,
				orderstatus: value.orderstatus,
				date: value.date,
			};
			console.log(value);
		})
    .catch((err) => {
      return res.status(500).json({
        status: 'error',
        messsage: err
      });
    });
  }

  static getUserOrders(req, res, next) {
    db.query('select * from orders where userId = $1',
			[req.params.userId])
		.then((data1) => {
			return res.status(200).json({
				orders: data1.rows,
				status: 'success',
				message: 'Orders found',
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
