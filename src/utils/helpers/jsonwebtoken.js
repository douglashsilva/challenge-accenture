/* eslint-disable no-undef */
const jwt = require('jsonwebtoken')
const path = require("path")
const fs = require("fs")
const MissingParamError = require('../errors/missing-param-error')

const { JWT_PUBLIC_RSA, JWT_PRIVATE_RSA, JWT_EXPIRES } = process.env

module.exports = class JsonWebToken {
  constructor () {
    this.publicKey = JWT_PUBLIC_RSA
    this.privateKey = JWT_PRIVATE_RSA
    this.expiresToken = Number(JWT_EXPIRES) || 3600 // 60 minutes
  }

  /**
   * Create Token
   * @param {object} payload 
   * @returns {Promise} Promise of {string}
   */
  create(payload){
    return new Promise((resolve,reject) => {
        try{
          let privateKey = fs.readFileSync(path.resolve(this.privateKey))
          jwt.sign(payload, privateKey, {
              expiresIn: this.expiresToken,
              algorithm: "RS256" // SHA-256 hash signature
          }, (_, token) => {
              return resolve(token)
          })
        }catch(e){
          return reject(e)
        }
    })
  }

  /**
   * Validate Token
   * @param {string} token 
   * @returns {Promise} Promise of {boolean}
   */
  validate(token){
    return new Promise((resolve,reject) => {
        try{
          let publicKey = fs.readFileSync(path.resolve(this.publicKey))
          jwt.verify(token, publicKey, {
              algorithms: "RS256" // SHA-256 hash signature
          }, (_, payload) => {
              return resolve(payload)
          })
        }catch(e){
          return reject(e)
        }
    })
  }

}
