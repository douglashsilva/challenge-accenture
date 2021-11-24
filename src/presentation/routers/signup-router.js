const HttpResponse = require('../helpers/http-response')
const { MissingParamError, InvalidParamError } = require('../../utils/errors')

module.exports = class LoginRouter {
  constructor ({ signupUseCase, emailValidator, telephoneValidator }) {
    this.signupUseCase = signupUseCase
    this.emailValidator = emailValidator
    this.telephoneValidator = telephoneValidator
  }

  async route (httpRequest) {
    try {
      let { nome, email, senha, telefones } = httpRequest.body

      if (!nome) return HttpResponse.badRequest(new MissingParamError('nome'))
      if (!email) return HttpResponse.badRequest(new MissingParamError('email'))
      if (!senha) return HttpResponse.badRequest(new MissingParamError('senha'))
      if (!telefones) return HttpResponse.badRequest(new MissingParamError('telefones'))

      // E-mail has invalid
      if (!this.emailValidator.isValid(email)) return HttpResponse.badRequest(new InvalidParamError('email'))

      // Validate and get valid telephones of array
      telefones = this.telephoneValidator.isValid(telefones)
      if(!telefones) return HttpResponse.badRequest(new InvalidParamError('telefones'))

      // Register new User
      const user = await this.signupUseCase.signup({ nome, email, senha, telefones })

      // E-mail is already registered
      if(!user) return HttpResponse.badRequest({ message: "E-mail já existente" })

      // All right
      return HttpResponse.created(user)
    } catch (e) {
      // Gave shit :P
      return HttpResponse.serverError()
    }
  }
}
