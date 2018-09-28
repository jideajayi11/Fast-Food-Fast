import GenValid from './index';

class Validate {
  static addOrder(req, res, next) {
    if (!(GenValid.isRequired(req.body.foodId))
     || !(GenValid.isRequired(req.body.quantity))) {
      return res.status(400).json({
        status: 'error',
        message: 'Incomplete parameters',
      });
    }  if (!(GenValid.isInteger(req.body.quantity))
     || !(GenValid.isInteger(req.body.foodId))) {
      return res.status(400).json({
        status: 'error',
        message: 'quantity, foodId must be Numbers'
      });
    } if (!(GenValid.isRequired(req.decoded.userId))) {
      return res.status(403).json({
        status: 'error',
        message: 'User is not signed in',
      });
    }
    next();
  }

  static updateOrder(req, res, next) {
    if (!(GenValid.isRequired(req.decoded.adminId))) {
      return res.status(403).json({
        status: 'error',
        message: 'Admin is not signed in',
      });
    }
    if (!(GenValid.isInteger(req.params.orderId))) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid orderId',
      });
    }
    if (req.body.orderStatus === 'New' || req.body.orderStatus === 'Processing'
     || req.body.orderStatus === 'Cancelled' || req.body.orderStatus === 'Complete') {
      next();
    } else {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid orderStatus',
      });
    }
  }
  static getOrder(req, res, next) {
    if (!(GenValid.isInteger(req.params.orderId))) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid orderId',
      });
    }
    next();
  }
}
export default Validate;
