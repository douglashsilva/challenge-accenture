const SigninRouter = require('../../presentation/routers/signin-router')
const SigninUseCase = require('../../domain/usecases/signin-usecase')

const EmailValidatorHelper = require('../../utils/helpers/email-validator')
const JsonWebTokenHelper = require("../../utils/helpers/jsonwebtoken")
const BcryptHelper = require("../../utils/helpers/bcrypt")

const UserRepository = require("../../infra/repositories/user-repository")

module.exports = class SigninRouterComposer {

  static compose () {

    // Helpers
    const jsonWebToken = new JsonWebTokenHelper()
    const bcrypt = new BcryptHelper()
    const emailValidator = new EmailValidatorHelper()
    
    // Repositories
    const userRepository = new UserRepository()

    // Load Dependencies
    const signinUseCase = new SigninUseCase({ 
      jsonWebToken,
      bcrypt,
      userRepository
    })

    return new SigninRouter({
      signinUseCase,
      emailValidator
    })
  }

}