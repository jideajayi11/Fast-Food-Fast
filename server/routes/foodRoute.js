import Food from '../controllers/foodController';
import Validate from '../helpers/validator/food';
import Verify from '../helpers/verifyToken';

export default (app) => {
  app.post('/api/v1/menu', Verify.adminToken,
    Validate.foodBody, Food.addMenu);
  app.put('/api/v1/menu/:foodId', Verify.adminToken,
    Validate.foodBody, Validate.foodParams, Food.updateMenu);
  app.delete('/api/v1/menu/:foodId', Verify.adminToken,
    Validate.foodParams, Food.deleteMenu);
  app.get('/api/v1/menu', Food.getMenu);
};
