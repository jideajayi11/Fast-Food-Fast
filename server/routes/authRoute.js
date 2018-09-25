import Auth from '../controllers/authController';
import Validate from '../helpers/validator/auth';

export default (app) => {
  app.post('/api/v1/auth/signup',
   Validate.userSignup, Auth.userSignup);
};
