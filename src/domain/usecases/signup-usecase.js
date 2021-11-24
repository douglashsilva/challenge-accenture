const validator = require("validator")

module.exports = class SignupUseCase {

  constructor ({ jsonWebToken, userRepository }) {
    this.jsonWebToken = jsonWebToken
    this.userRepository = userRepository
  }

  async signup (user) {
      try{
        // avoiding xss 
        user.nome = validator.escape(user.nome)

        // Register user and create Access Token
        let registedUser = await this.userRepository.create(user)
        registedUser.token = await this.jsonWebToken.create({ id: registedUser.id })
        await registedUser.save()

        // Selecting required data
        user.id = registedUser.id
        user.data_criacao = registedUser.data_criacao
        user.data_atualizacao = registedUser.data_atualizacao
        user.token = registedUser.token
        user.ultimo_login = registedUser.ultimo_login
        delete user.senha
        
        // All right :P
        return user
      }catch(e){
        // code E11000: duplicated unique key index / E-mail already registered 
        if(e.code === 11000) return null
        throw new Error(e)
      }
  }
}
