const SignupRouter = require('../../presentation/routers/signup-router')
const SignupUseCase = require('../../domain/usecases/signup-usecase')

const EmailValidatorHelper = require('../../utils/helpers/email-validator')
const TelephoneValidatorHelper = require("../../utils/helpers/telephone-validator")
const JsonWebTokenHelper = require("../../utils/helpers/jsonwebtoken")

const UserRepository = require("../../infra/repositories/user-repository")

module.exports = class SignupRouterComposer {

  static compose () {

    // Helpers
    const jsonWebToken = new JsonWebTokenHelper()
    const emailValidator = new EmailValidatorHelper()
    const telephoneValidator = new TelephoneValidatorHelper()
    
    // Repositories
    const userRepository = new UserRepository()

    // Load Dependencies
    const signupUseCase = new SignupUseCase({ 
      jsonWebToken,
      userRepository
    })

    return new SignupRouter({
      signupUseCase,
      emailValidator,
      telephoneValidator
    })
  }

}