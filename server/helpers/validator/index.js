class Validate {
  static isInteger(value) {
    return /^\d+$/.test(value);
  }

  static isNumber(value) {
    return /^\d+(\.\d+)*$/.test(value);
  }

  static isEmail(value) {
    return /^.+@.+\..+$/.test(value);
  }

  static isRequired (value) {
    if(value === '' || value === undefined) {
      return false;
    }else {
      return true;
    }
  }
}
export default Validate;
