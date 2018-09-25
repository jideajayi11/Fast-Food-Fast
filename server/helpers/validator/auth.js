import GenValid from './index';
import db from '../db';

class Validate {
  static userSignup(req, res, next) {
    if (!(GenValid.isRequired(req.body.fullName))
       || !(GenValid.isRequired(req.body.phoneNumber))
       || !(GenValid.isRequired(req.body.deliveryAddress))
       || !(GenValid.isRequired(req.body.email))
       || !(GenValid.isRequired(req.body.password))
       || !(GenValid.isRequired(req.body.confirmPassword))) {
      return res.status(400).json({
        status: 'error',
        message: 'Incomplete signup details',
      });
    } if (!(GenValid.isEmail(req.body.email))) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid email address',
      });
    } if (req.body.password !== req.body.confirmPassword) {
      return res.status(403).json({
        status: 'error',
        message: 'Password do not match',
      });
    }
    db.query('SELECT * FROM users WHERE email = $1', [req.body.email])
      .then((data) => {
        if (data.rows[0].email === req.body.email) {
          return res.status(403).json({
            status: 'error',
            message: 'Email address already exists',
          });
        }
      });

    next();
  }

  static userSignin(req, res, next) {
    if (!(GenValid.isRequired(req.body.email))
       || !(GenValid.isRequired(req.body.password))) {
      return res.status(400).json({
        status: 'error',
        message: 'Incomplete signin details',
      });
    }
  }
}
export default Validate;