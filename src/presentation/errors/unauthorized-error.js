module.exports = class UnauthorizedError extends Error {
  constructor () {
    super('Não autorizado')
    this.name = 'UnauthorizedError'
  }
}
