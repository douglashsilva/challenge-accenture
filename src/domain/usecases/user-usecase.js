module.exports = class UserUseCase {

  constructor ({ userRepository }) {
    this.userRepository = userRepository
  }

  /**
   * Get User
   * @param {string} id 
   */
  async getUser (id) {
    let user = await this.userRepository
    .getById(id)
    .select("-__v -telefones._id -_id -token")
    return user
  }

}