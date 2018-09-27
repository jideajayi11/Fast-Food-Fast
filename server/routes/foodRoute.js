import Food from '../controllers/foodController';
import Validate from '../helpers/validator/food';
import Verify from '../helpers/verifyToken';

export default (app) => {
  app.post('/api/v1/menu', Verify.adminToken,
   Validate.addMenu, Food.addMenu);
   app.get('/api/v1/menu', Food.getMenu);
};