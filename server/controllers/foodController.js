import jwt from 'jsonwebtoken';
import env from 'dotenv';
import db from '../helpers/db';

env.config();

class Food {
  static addMenu(req, res, next) {
    db.query(`INSERT INTO food
        (foodName, price, adminId, imageURL)
        VALUES($1, $2, $3, $4) RETURNING *`,
        [req.body.foodDescription, req.body.foodPrice, req.body.imageURL,
          req.body.imageURL])
          .then((data) => {
            const token = jwt.sign({
              email: data.rows[0].email,
              userId: data.rows[0].id
            }, process.env.JWT_KEY, {
              expiresIn: 86400
            });
            return res.status(201).json({
              token,
              status: 'success',
              message: 'User account was created',
            });
          })
          .catch(err => {
            if(err.code == '23505'){
              return res.status(400).json({
                status: 'error',
                message: 'Email already exist',
              });
            }
            return res.status(500).json({
              status: 'error',
              message: err,
            });
          });
  }
}

export default Food;
