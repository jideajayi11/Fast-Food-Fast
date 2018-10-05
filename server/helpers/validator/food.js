import GenValid from './index';

/**
 * @description middlewares to validate menu endpoints
 */
class Validate {
  /**
   *
   * @param {object} req
   * @param {object} res
   * @param {Function} next
   * @returns {object} Validate request body when adding food to menu
   */
  static foodBody(req, res, next) {
    if (!(GenValid.isRequired(req.body.foodDescription))
       || !(GenValid.isRequired(req.body.foodPrice))
       || !(GenValid.isRequired(req.body.imageURL))) {
      return res.status(400).json({
        status: 'error',
        message: 'Incomplete body parameters',
      });
    } if (!(GenValid.isNumber(req.body.foodPrice))) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid Price',
      });
    }
    next();
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @param {Function} next
   * @returns {object} Validate the parameter in the API URL for menus
   */
  static foodParams(req, res, next) {
    if (!(GenValid.isInteger(req.params.foodId))) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid foodId',
      });
    }
    next();
  }
}
export default Validate;
