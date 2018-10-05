import GenValid from './index';

/**
 * @description middlewares to validate order endpoints
 */
class Validate {
  /**
   *
   * @param {object} req
   * @param {object} res
   * @param {Function} next
   * @returns {object} The method creates a new order
   */
  static addOrder(req, res, next) {
    if (!(GenValid.isRequired(req.body.foodId))
     || !(GenValid.isRequired(req.body.quantity))) {
      return res.status(400).json({
        status: 'error',
        message: 'Incomplete parameters',
      });
    } if (!(GenValid.isInteger(req.body.quantity))
     || !(GenValid.isInteger(req.body.foodId))) {
      return res.status(400).json({
        status: 'error',
        message: 'quantity, foodId must be Numbers'
      });
    }
    next();
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @param {Function} next
   * @returns {object} The method updates an order
   */
  static updateOrder(req, res, next) {
    if (!(GenValid.isInteger(req.params.orderId))) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid orderId',
      });
    }
    if (req.body.orderStatus === 'New'
     || req.body.orderStatus === 'Processing'
     || req.body.orderStatus === 'Cancelled'
     || req.body.orderStatus === 'Complete') {
      next();
    } else {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid orderStatus',
      });
    }
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @param {Function} next
   * @returns {object} The method gets all orders made to admin
   */
  static getOrder(req, res, next) {
    if (!(GenValid.isInteger(req.params.orderId))) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid orderId',
      });
    }
    next();
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @param {Function} next
   * @returns {object} The method get users order history
   */
  static getUserOrders(req, res, next) {
    if (!(GenValid.isInteger(req.params.userId))) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid userId',
      });
    }
    next();
  }
}
export default Validate;
