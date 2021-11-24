const validator = require('validator')
const MissingParamError = require('../errors/missing-param-error')

module.exports = class EmailValidator {

  /**
   * Validate E-mail
   * @param {string} email 
   * @returns 
   */
  isValid (email) {
    return validator.isEmail(email)
  }

}
