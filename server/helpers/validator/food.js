import GenValid from './index';

class Validate {
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
