const HttpResponse = require('../helpers/http-response')

module.exports = class UserRouter {
  constructor ({ userUseCase }) {
    this.userUseCase = userUseCase
  }

  async route (httpRequest) {
    try {
      const { user: { id } } = httpRequest
      let user = await this.userUseCase.getUser(id)
      // All right
      return HttpResponse.ok(user)
    } catch (e) {
      // Gave shit :P
      return HttpResponse.serverError()
    }
  }
}
