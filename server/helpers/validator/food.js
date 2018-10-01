import GenValid from './index';

class Validate {
  static addMenu(req, res, next) {
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
  static updateMenu(req, res, next) {
    if (!(GenValid.isInteger(req.params.foodId)) && GenValid.isRequired(req.params.foodId)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid foodId',
      });
    } if (!(GenValid.isRequired(req.body.foodDescription))
    && !(GenValid.isRequired(req.body.foodPrice))
    && !(GenValid.isRequired(req.body.imageURL))) {
      return res.status(400).json({
        status: 'error',
        message: 'Description, Price or Image URL must be updated',
      });
    }
    next();
  }
  static deleteMenu(req, res, next) {
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
