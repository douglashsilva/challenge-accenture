const { UnauthorizedError, ServerError } = require('../errors')

module.exports = class HttpResponse {

  static ok (body) {
    return {
      statusCode: 200,
      body
    }
  }

  static created(body){
    return {
      statusCode: 201,
      body
    }
  }

  static badRequest (error) {
    return {
      statusCode: 400,
      body: {
        mensagem: error.message
      }
    }
  }

  static unauthorizedError (error = null) {
    return {
      statusCode: 401,
      body: {
        mensagem: !error ? new UnauthorizedError().message : error
      }
    }
  }

  static serverError () {
    return {
      statusCode: 500,
      body: {
        mensagem: new ServerError().message
      }
    }
  }
  
}
