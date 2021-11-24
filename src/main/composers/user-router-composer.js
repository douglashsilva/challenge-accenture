const UserRouter = require('../../presentation/routers/user-router')
const UserUseCase = require('../../domain/usecases/user-usecase')

const UserRepository = require("../../infra/repositories/user-repository")

module.exports = class UserRouterComposer {

  static compose () {

    // Repositories
    const userRepository = new UserRepository()

    // Load Dependencies
    const userUseCase = new UserUseCase({ 
        userRepository
    })

    return new UserRouter({
      userUseCase
    })
  }

}