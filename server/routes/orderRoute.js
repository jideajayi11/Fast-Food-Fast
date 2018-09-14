import Order from '../controller/orderController';

export default (app) => {
  app.get('/api/v1/orders', Order.getOrders);
  app.get('/api/v1/orders/:id', Order.getOrder);
  app.post('/api/v1/orders', Order.addOrder);
  app.put('/api/v1/orders/:id', Order.updateOrder);
};