import Food from '../controllers/foodController';
import Validate from '../helpers/validator/food';
import verifyAdmin from '../helpers/verifyToken/admin';

export default (app) => {
  app.post('/api/v1/menu', verifyAdmin,
   Validate.addMenu, Food.addMenu);
   app.get('/api/v1/menu', Food.getMenu);
};