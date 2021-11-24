const { MissingParamError } = require('../../utils/errors/index')
const UserModel = require("../../domain/models/user-model")

module.exports = class UserRepository {

  /**
   * Get User by ID
   * @param {string} id 
   */
  getById (id) {
    // Email required
    if (!id) throw new MissingParamError('id')
    return UserModel.findOne({ id })
  }

  /**
   * Get User
   * @param {string} email 
   */
   getByEmail (email) {
    // Email required
    if (!email) throw new MissingParamError('email')
    return UserModel.findOne({ email })
  }

  /**
   * Create User
   * @param {object} user 
   */
  create (user) {
    // User required
    if (!user) throw new MissingParamError('user')
    return UserModel.create(user)
  }

}