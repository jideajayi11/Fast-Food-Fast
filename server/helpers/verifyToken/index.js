import jwt from 'jsonwebtoken';
import env from 'dotenv';
import db from '../db';
import GenValid from '../validator';

class Verify {
  static adminToken (req, res, next) {
		const token = req.headers['x-access-token'];
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
			if (err) {
				return res.status(403).json({
          status: 'error',
          message: 'Failed to authenticate token.'
        });
			}
      db.query('select * from admin where id = $1',
       [decoded.adminId])
      .then((data) => {
        if (!(GenValid.isRequired(decoded.adminId))) {
          return res.status(403).json({
            status: 'error',
            message: 'Admin is not signed in',
          });
        }
        req.decoded = decoded;
        next();
      })
      .catch((err) => {
				res.status(500).json({
					status: 'error',
					message: 'something went wrong'
				})
			});
		});
  }

  static userToken (req, res, next) {
    const token = req.headers['x-access-token'];
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
			if (err) {
				return res.status(403).json({
          status: 'error',
          message: 'Failed to authenticate token.'
        });
			}
      db.query('select * from users where id = $1',
       [decoded.userId])
      .then((data) => {
        if (!(GenValid.isRequired(decoded.userId))) {
          return res.status(403).json({
            status: 'error',
            message: 'User is not signed in',
          });
        }
				req.decoded = decoded;
      	next();
      })
      .catch((err) => {
				res.status(500).json({
					status: 'error',
					message: 'something went wrong'
				})
			});
		});
  }
}
export default Verify;