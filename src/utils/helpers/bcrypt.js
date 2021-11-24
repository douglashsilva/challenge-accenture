const bcrypt = require('bcrypt')
const MissingParamError = require('../errors/missing-param-error')

module.exports = class Bcrypt {

  /**
   * Create Hash
   * @param {*} value 
   * @returns {string}
   */
  create(value){
    return bcrypt.hashSync(value, bcrypt.genSaltSync(10))
  }

  /**
   * Compare Hash
   * @param {*} value 
   * @param {string} hash 
   * @returns {string}
   */
  compare(value, hash){
    return bcrypt.compareSync(value, hash)
  }
  
}
