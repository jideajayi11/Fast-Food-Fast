import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import env from 'dotenv';
import db from '../helpers/db';
import GenValid from '../helpers/validator';

env.config();

/**
 * @description handles authentication for users and admin
 */
class Auth {
  /**
   *
   * @param {object} req
   * @param {object} res
   * @param {Function} next
   * @returns {object} The method creates a new user account
   */
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
          fullName: data.rows[0].fullname,
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
      .catch((err) => {
        if (err.code == '23505') {
          return res.status(400).json({
            status: 'error',
            message: 'Email already exist',
          });
        }
        return res.status(500).json({
          status: 'error',
          message: 'Authentication failed.',
        });
      });
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @param {Function} next
   * @returns {object} The method signin a user
   */
  static userSignin(req, res, next) {
    db.query('select * from users where email = $1', [req.body.email])
      .then((data) => {
        if (bcrypt.compareSync(req.body.password, data.rows[0].password)) {
          const token = jwt.sign({
            email: data.rows[0].email,
            fullName: data.rows[0].fullname,
            userId: data.rows[0].id
          }, process.env.JWT_KEY, {
            expiresIn: 86400
          });
          return res.status(200).json({
            token,
            status: 'success',
            message: 'You are now logged in',
          });
        }
        return res.status(404).json({
          status: 'error',
          message: 'Authentication failed.',
        });
      })
      .catch(err => res.status(500).json({
        status: 'error',
        message: 'Signin failed.',
      }));
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @param {Function} next
   * @returns {object} The method creates a new admin account
   */
  static adminSignup(req, res, next) {
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
          fullName: data.rows[0].restaurantname,
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
      .catch((err) => {
        if (err.code == '23505') {
          return res.status(400).json({
            status: 'error',
            message: 'Email already exist',
          });
        }
        return res.status(500).json({
          status: 'error',
          message: 'Authentication failed.',
        });
      });
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @param {Function} next
   * @returns {object} The method signin an admin
   */
  static adminSignin(req, res, next) {
    db.query('select * from admin where email = $1', [req.body.email])
      .then((data) => {
        if (bcrypt.compareSync(req.body.password, data.rows[0].password)) {
          const token = jwt.sign({
            email: data.rows[0].email,
            fullName: data.rows[0].restaurantname,
            adminId: data.rows[0].id
          }, process.env.JWT_KEY, {
            expiresIn: 86400
          });
          return res.status(200).json({
            token,
            status: 'success',
            message: 'You are now logged in',
          });
        }
        return res.status(404).json({
          status: 'error',
          message: 'Authentication failed.',
        });
      })
      .catch(err => res.status(500).json({
        status: 'error',
        message: 'Signin failed.',
      }));
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @param {Function} next
   * @returns {object} The method get all restaurant
   */
  static restaurant(req, res, next) {
    db.query('SELECT id, restaurantname, phonenumber FROM admin')
      .then(data => res.status(200).json({
        restaurant: data.rows,
        status: 'success',
        message: 'Restaurant found'
      }));
  }

  /**
   * 
   * @param {object} req 
   * @param {object} res 
   * @param {Function} next 
   * @returns {object} The method to verify token
   */
  static verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          status: 'error',
          message: 'Failed to authenticate token.'
        });
      } else if (GenValid.isRequired(decoded.adminId)) {
        return res.status(200).json({
          status: 'success',
          message: 'admin verified'
        });
      } else if (GenValid.isRequired(decoded.userId)) {
        return res.status(200).json({
          status: 'success',
          message: 'user verified'
        });
      }
    });
  }
}

export default Auth;
