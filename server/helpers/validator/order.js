class Validate {
	static addOrder(req, res, next) {
    if (req.body.userId === '' || req.body.foodId === ''
     || req.body.foodDescription === '') {
      return res.status(400).json({
        status: 'error',
        message: 'Incomplete parameters',
      });
    }else if (req.body.foodImageURL === '' || req.body.foodPrice === ''
     || req.body.quantity === '') {
      return res.status(400).json({
        status: 'error',
        message: 'Incomplete parameters',
      });
    }else if (req.body.userId === undefined || req.body.foodId === undefined
     || req.body.foodDescription === undefined) {
      return res.status(400).json({
        status: 'error',
        message: 'Incomplete parameters',
      });
    }else if (req.body.foodImageURL === undefined || req.body.foodPrice === undefined
     || req.body.quantity === undefined) {
      return res.status(400).json({
        status: 'error',
        message: 'Incomplete parameters',
      });
     }/*else if (!(typeof req.body.userId === 'number') || !(typeof req.body.foodId === 'number')
     || !(typeof req.body.foodPrice === 'number') || !(typeof req.body.quantity === 'number')) {
      return res.status(400).json({
        status: 'error',
        message: 'userId, foodId, food price and quantity must be Numbers',
      });
     }*/else {
      next();
    }
  }
}
export default Validate;