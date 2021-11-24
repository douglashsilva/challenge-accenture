require("dotenv").config()

module.exports = {
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  collectCoverageFrom: ['**/src/**/*.js', '!**/src/main/**'],
  coveragePathIgnorePatterns: [
    '<rootDir>/src/domain/models',
    '<rootDir>/src/presentation/errors',
    '<rootDir>/src/presentation/helpers'
  ]
}
