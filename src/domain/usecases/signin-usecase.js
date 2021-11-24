const { MissingParamError } = require('../../utils/errors')

module.exports = class SigninUseCase {

  constructor ({ jsonWebToken, bcrypt, userRepository }) {
    this.jsonWebToken = jsonWebToken
    this.bcrypt = bcrypt
    this.userRepository = userRepository
  }

  /**
   * Signin User
   * @param {string} email 
   * @param {string} password 
   */
  async signin (email, password) {
    // E-mail required
    if (!email) throw new MissingParamError('email')
    // Password required
    if (!password) throw new MissingParamError('senha')
    
    // Search user by email
    let user = await this.userRepository
    .getByEmail(email)
    .select("+senha -__v -telefones._id")

    // User not found by email
    if(!user) return false

    // Password not match
    if(!this.bcrypt.compare(password, user.senha)) return false
   
    // Create token and update lastAccess
    user.token = await this.jsonWebToken.create({ id: user.id })
    user.ultimo_login = Date.now()
    await user.save()

    // Convert to Object and data not needed 
    user = user.toObject()
    delete user._id
    delete user.senha

    // All right :p
    return user
  }
}