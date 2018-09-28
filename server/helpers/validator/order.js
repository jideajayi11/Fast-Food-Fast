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
    if (!(GenValid.isInteger(req.params.id))) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid Parameter',
      });
    }
    if (req.body.orderStatus == 'pending' || req.body.orderStatus == 'accepted'
     || req.body.orderStatus == 'declined' || req.body.orderStatus == 'completed') {
      next();
    } else {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid Status',
      });
    }
  }
}
export default Validate;
