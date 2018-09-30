import Order from '../controllers/orderController';
import Validate from '../helpers/validator/order';
import Verify from '../helpers/verifyToken';

export default (app) => {
  app.get('/api/v1/orders', Verify.adminToken,
   Order.getOrders);
  app.get('/api/v1/users/:userId/orders',
   Validate.getUserOrders, Order.getUserOrders);
  app.get('/api/v1/orders/:orderId', Verify.adminToken,
   Validate.getOrder, Order.getOrder);
  app.post('/api/v1/orders', Verify.userToken,
   Validate.addOrder, Order.addOrder);
  app.put('/api/v1/orders/:orderId', Verify.adminToken,
   Validate.updateOrder, Order.updateOrder);
};
