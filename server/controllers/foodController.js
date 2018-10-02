import jwt from 'jsonwebtoken';
import env from 'dotenv';
import db from '../helpers/db';
import GenValid from '../helpers/validator';

env.config();

class Food {
  static addMenu(req, res, next) {
    db.query(`INSERT INTO food
			(foodName, price, adminId, imageURL)
			VALUES($1, $2, $3, $4) RETURNING *`,
    [req.body.foodDescription, req.body.foodPrice,
      req.decoded.adminId, req.body.imageURL])
      .then(data => res.status(201).json({
        food: {
          id: data.rows[0].id,
          description: data.rows[0].foodname,
          price: data.rows[0].price,
          adminId: data.rows[0].adminid,
        },
        status: 'success',
        message: 'Food Added',
      }))
      .catch(err => res.status(500).json({
        status: 'error',
        message: err,
      }));
  }
  static updateMenu (req, res, next) {
    db.query(`update food set foodName = $1, price = $2, imageURL = $3 
      where id = $4 AND adminId = $5 RETURNING *`,
      [req.body.foodDescription, req.body.foodPrice, 
      req.body.imageURL, req.params.foodId, req.decoded.adminId])
    .then((data) => {
      if(data.rows[0]) {
        return res.status(200).json({
          status: 'success',
          message: 'Food updated',
        });
      }
      return res.status(404).json({
        status: 'error',
        message: 'Food not found',
      });
    });
  }
  static getMenu (req, res, next) {
    let id;
    if(req.headers['x-access-token']) {
      jwt.verify(req.headers['x-access-token'], process.env.JWT_KEY, (err, decoded) => {
        id = decoded.adminId;
      });
    } 
    if(!GenValid.isRequired(id)) {
      if (req.query.id)
        id = req.query.id;
      else
        id = 1;
    }
    db.query(`select id, foodname, imageurl, price, adminid
     from food where adminid = $1`, [id])
    .then(data => res.status(200).json({
      menus: data.rows,
      status: 'success',
      message: 'Food List',
    }))
    .catch(err => res.status(500).json({
      status: 'error',
      message: err,
    }));
  }
  static deleteMenu (req, res, next) {
    db.query('delete from food where id = $1 AND adminId = $2 RETURNING *',
     [req.params.foodId, req.decoded.adminId])
    .then((data) => {
      if(data.rows[0]) {
        res.status(200).json({
          status: 'success',
          message: 'Food deleted',
        })
      } else {
        res.status(404).json({
          status: 'error',
          message: 'Food not found',
        })
      }
    });
  }
}

export default Food;
