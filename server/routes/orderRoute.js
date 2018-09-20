import Order from '../controllers/orderController';
import Validate from '../helpers/validator/order';

export default (app) => {
  app.get('/api/v1/orders', Order.getOrders);
  app.get('/api/v1/orders/:id', Order.getOrder);
  app.post('/api/v1/orders', Validate.addOrder, Order.addOrder);
  app.put('/api/v1/orders/:id', Validate.updateOrder, Order.updateOrder);
};