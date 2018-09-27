import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import env from 'dotenv';
import db from '../helpers/db';

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
            if(err.code == '23505'){
              return res.status(400).json({
                status: 'error',
                message: 'Email already exist',
              });
            }
            console.log(err);
            return res.status(500).json({
              status: 'error',
              message: err,
            });
          });
  }
  static userSignin(req, res, next) {
    db.query('select * from users where email = $1', [req.body.email])
    .then((data) => {
        if(bcrypt.compareSync(req.body.password, data.rows[0].password)) {
          const token = jwt.sign({
            email: data.rows[0].email,
            userId: data.rows[0].id
          }, process.env.JWT_KEY, {
            expiresIn: 86400
          });
          return res.status(200).json({
            token,
            status: 'success',
            message: 'You are now logged in',
          });
        } else {
          return res.status(404).json({
            status: 'error',
            message: 'Authentication failed. Invalid password.',
          });
        }
    })
    .catch((err) => {
      return res.status(500).json({
        status: 'error',
        message: err,
      });
    });
  }
  static adminSignup (req, res, next) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    db.query(`INSERT INTO admin
        (restaurantName, phoneNumber, email, password)
        VALUES($1, $2, $3, $4) RETURNING *`,
        [req.body.restaurant, req.body.phoneNumber,
          req.body.email, hash])
          .then((data) => {
            const token = jwt.sign({
              email: data.rows[0].email,
              adminId: data.rows[0].id
            }, process.env.JWT_KEY, {
              expiresIn: 86400
            });
            return res.status(201).json({
              token,
              status: 'success',
              message: 'Admin account was created',
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
  static adminSignin(req, res, next) {
    db.query('select * from admin where email = $1', [req.body.email])
    .then((data) => {
        if(bcrypt.compareSync(req.body.password, data.rows[0].password)) {
          const token = jwt.sign({
            email: data.rows[0].email,
            adminId: data.rows[0].id
          }, process.env.JWT_KEY, {
            expiresIn: 86400
          });
          return res.status(200).json({
            token,
            status: 'success',
            message: 'You are now logged in',
          });
        } else {
          return res.status(404).json({
            status: 'error',
            message: 'Authentication failed. Invalid password.',
          });
        }
    })
    .catch((err) => {
      return res.status(500).json({
        status: 'error',
        message: err,
      });
    });
  }
}

export default Auth;
