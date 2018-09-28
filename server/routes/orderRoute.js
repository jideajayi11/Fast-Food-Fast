import Order from '../controllers/orderController';
import Validate from '../helpers/validator/order';
import Verify from '../helpers/verifyToken';

export default (app) => {
  app.get('/api/v1/orders', Order.getOrders);
  app.get('/api/v1/orders/:id', Order.getOrder);
  app.post('/api/v1/orders', Verify.userToken,
   Validate.addOrder, Order.addOrder);
  app.put('/api/v1/orders/:orderId', Verify.adminToken,
   Validate.updateOrder, Order.updateOrder);
};
