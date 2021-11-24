const HttpResponse = require('../helpers/http-response')
const { MissingParamError, InvalidParamError } = require('../../utils/errors')

module.exports = class SigninRouter {
  constructor ({ signinUseCase, emailValidator }) {
    this.signinUseCase = signinUseCase
    this.emailValidator = emailValidator
  }

  async route (httpRequest) {
    try {
      const { email, senha: password } = httpRequest.body
      // E-mail required
      if (!email) return HttpResponse.badRequest(new MissingParamError('email'))
      // E-mail has invalid
      if (!this.emailValidator.isValid(email)) return HttpResponse.badRequest(new InvalidParamError('email'))
      // Password required
      if (!password) return HttpResponse.badRequest(new MissingParamError('senha'))
      // User authentication
      const user = await this.signinUseCase.signin(email, password)
      // Authentication did not work
      if (!user) return HttpResponse.unauthorizedError("Usuário e/ou senha inválidos")
      // All right
      return HttpResponse.ok(user)
    } catch (e) {
      // Gave shit :P
      return HttpResponse.serverError()
    }
  }
}
