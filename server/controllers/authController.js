import jwt from 'jsonwebtoken';
import db from '../helpers/db';
import bcrypt from 'bcryptjs';
import env from 'dotenv';
env.config();

class Auth {
  static userSignup(req, res, next) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    db.query(`INSERT INTO users
        (fullName, phoneNumber, deliveryAddress, email, password)
        VALUES($1, $2, $3, $4, $5) RETURNING *`,
        [req.body.fullName, req.body.phoneNumber, req.body.deliveryAddress,
          req.body.email, hash])
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
            return res.status(500).json({
              status: 'error',
              message: err.details,
            });
          });
  }
}

export default Auth;
