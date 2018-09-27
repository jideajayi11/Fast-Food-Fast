import jwt from 'jsonwebtoken';
import env from 'dotenv';
import db from '../helpers/db';

env.config();

class Food {
  static addMenu(req, res, next) {
    db.query(`INSERT INTO food
			(foodName, price, adminId, imageURL)
			VALUES($1, $2, $3, $4) RETURNING *`,
			[req.body.foodDescription, req.body.foodPrice,
				req.decoded.adminId, req.body.imageURL])
				.then((data) => {
					return res.status(201).json({
						food: {
							id: data.rows[0].id,
							description: data.rows[0].foodname,
							price: data.rows[0].price,
							adminId: data.rows[0].adminid,
						},
						status: 'success',
						message: 'Food Added',
					});
				})
				.catch(err => {
					return res.status(500).json({
						status: 'error',
						message: err,
					});
				});
  }
}

export default Food;
