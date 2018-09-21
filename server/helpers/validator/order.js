import GenValid from './index';

class Validate {
  static addOrder(req, res, next) {
    if (req.body.userId === '' || req.body.foodId === ''
     || req.body.foodDescription === '') {
      return res.status(400).json({
        status: 'error',
        message: 'Incomplete parameters',
      });
    } if (req.body.foodImageURL === '' || req.body.foodPrice === ''
     || req.body.quantity === '') {
      return res.status(400).json({
        status: 'error',
        message: 'Incomplete parameters',
      });
    } if (req.body.userId === undefined || req.body.foodId === undefined
     || req.body.foodDescription === undefined) {
      return res.status(400).json({
        status: 'error',
        message: 'Incomplete parameters',
      });
    } if (req.body.foodImageURL === undefined || req.body.foodPrice === undefined
     || req.body.quantity === undefined) {
      return res.status(400).json({
        status: 'error',
        message: 'Incomplete parameters',
      });
    } if (!(GenValid.isInteger(req.body.userId)) || !(GenValid.isInteger(req.body.foodId))) {
      return res.status(400).json({
        status: 'error',
        message: 'userId, foodId must be Numbers'
      });
    } if (!(GenValid.isNumber(req.body.foodPrice)) || !(GenValid.isInteger(req.body.quantity))) {
      return res.status(400).json({
        status: 'error',
        message: 'food price and quantity must be Numbers'
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
