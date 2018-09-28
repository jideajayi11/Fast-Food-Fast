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
    } if (!(GenValid.isRequired(req.decoded.adminId))) {
      return res.status(403).json({
        status: 'error',
        message: 'Admin is not signed in',
      });
    }
    next();
  }
  static getMenu (req, res, next) {
    if (!(GenValid.isRequired(req.decoded.adminId))) {
      return res.status(403).json({
        status: 'error',
        message: 'Admin is not signed in',
      });
    }
    next();
  }
}
export default Validate;
