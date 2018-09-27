import jwt from 'jsonwebtoken';
import env from 'dotenv';
import GenValid from '../validator';

env.config();
export default (req, res, next) => {
	const token = req.headers['x-access-token'];
  if (GenValid.isRequired(token)) {
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        return res.json({ 
					success: 'error',
					message: 'Failed to authenticate token.' 
				});
      }
      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(403).send({
        success: 'error',
        message: 'No token provided.',
    });
  }
}