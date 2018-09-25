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
          .then(data => res.status(201).json({
            user: {
              id: data.rows[0].id,
              fullName: data.rows[0].fullname,
              phoneNumber: data.rows[0].phonenumber,
              deliveryAddress: data.rows[0].deliveryaddress,
              email: data.rows[0].email,
              date: data.rows[0].date
            },
            status: 'success',
            message: 'User account was created',
          }));
      });
    });
  }
}

export default Auth;
