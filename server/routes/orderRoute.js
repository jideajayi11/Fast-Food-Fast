import Order from '../controllers/orderController';
import Validate from '../helpers/validator/order';
import verifyAdmin from '../helpers/verifyToken/admin';
import verifyUsers from '../helpers/verifyToken/users';

export default (app) => {
  app.get('/api/v1/orders', verifyAdmin,
   Order.getOrders);
  app.get('/api/v1/users/:userId/orders',
   Validate.getUserOrders, Order.getUserOrders);
  app.get('/api/v1/orders/:orderId', verifyAdmin,
   Validate.getOrder, Order.getOrder);
  app.post('/api/v1/orders', verifyUsers,
   Validate.addOrder, Order.addOrder);
  app.put('/api/v1/orders/:orderId', verifyAdmin,
   Validate.updateOrder, Order.updateOrder);
};
