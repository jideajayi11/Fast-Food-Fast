import jwt from 'jsonwebtoken';
import db from '../helpers/db';
import bcrypt from 'bcryptjs';

class Auth {
  static userSignup(req, res, next) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(req.body.password, salt, (err, hash) => {
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
            res.status(201).json({
              token,
              status: 'success',
              message: 'User account was created',
            });
          });
      });
    });
  }
}

export default Auth;
