import Auth from '../controllers/authController';
import Admin from '../controllers/authAdminController';
import Validate from '../helpers/validator/auth';

export default (app) => {
  app.post('/api/v1/auth/signup',
    Validate.userSignup, Auth.userSignup);
  app.post('/api/v1/auth/login',
    Validate.signin, Auth.userSignin);
  app.post('/api/v1/admin/signup',
    Validate.adminSignup, Admin.adminSignup);
  app.post('/api/v1/admin/login',
    Validate.signin, Admin.adminSignin);
};
