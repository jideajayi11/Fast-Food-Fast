/**
 * @description Validate inputs using a pattern
 */
class Validate {
  /**
   *
   * @param {int} value
   * @returns {boolean} Returns true only if an integer is passed in
   */
  static isInteger(value) {
    return /^\d+$/.test(value);
  }

  /**
   *
   * @param {number} value
   * @returns {boolean} Returns true only if a number is passed in
   */
  static isNumber(value) {
    return /^\d+(\.\d+)*$/.test(value);
  }

  /**
   *
   * @param {string} value
   * @returns {boolean} Returns true only if an email address is passed in
   */
  static isEmail(value) {
    return /^.+@.+\..+$/.test(value);
  }

  /**
   *
   * @param {string} value
   * @returns {boolean} Returns true if the input is not empty
   */
  static isRequired(value) {
    if (value === '' || value === undefined) {
      return false;
    }
    return true;
  }
}
export default Validate;
