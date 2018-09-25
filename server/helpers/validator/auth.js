import GenValid from './index';
import db from '../../helpers/db';

class Validate {
  static userSignup(req, res, next) {
    if(!(GenValid.isRequired(req.body.fullName)) || 
       !(GenValid.isRequired(req.body.phoneNumber)) || 
       !(GenValid.isRequired(req.body.deliveryAddress)) || 
       !(GenValid.isRequired(req.body.email)) || 
       !(GenValid.isRequired(req.body.password)) || 
       !(GenValid.isRequired(req.body.confirmPassword))) {
      return res.status(400).json({
        status: 'error',
        message: 'Incomplete signup details',
      });
    } else if (!(GenValid.isEmail(req.body.email))) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid email address',
      });
    } else if (req.body.password !== req.body.confirmPassword) {
      return res.status(400).json({
        status: 'error',
        message: 'Password do not match',
      });
    } else {
      db.query('SELECT * FROM users WHERE email = $1', [req.body.email])
      .then((data) => {
        if (data.rows[0].email === req.body.email) {
          return res.status(400).json({
            status: 'error',
            message: 'Email address already exists',
          });
        }
      });
      next();
    }
  }

}
export default Validate;