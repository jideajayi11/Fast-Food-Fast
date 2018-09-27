import Food from '../controllers/foodController';
import Validate from '../helpers/validator/food';

export default (app) => {
  app.post('/api/v1/menu',
    Validate.addMenu, Food.addMenu);
};
