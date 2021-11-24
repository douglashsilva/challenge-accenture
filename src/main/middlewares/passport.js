/* eslint-disable no-undef */
const fs = require("fs")
const path = require("path")
const passport = require("passport")
const { Strategy, ExtractJwt } = require("passport-jwt")
const moment = require("moment")

const UserRepository = require("../../infra/repositories/user-repository")
const userRepository = new UserRepository()

const { JWT_PUBLIC_RSA, SESSION_LIFETIME } = process.env

/**
 * Get Bearer Token from Authorization
 * @param {string} authorization 
 * @returns {string}
 */
const getBearerToken = (authorization) => {
	if(!authorization) return false
	authorization = authorization.split("Bearer")
	if(authorization.length != 2) return false
	authorization = authorization.pop().trim()
	return authorization
}

const jsonWebTokenStrategy = new Strategy({
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: fs.readFileSync(path.resolve(JWT_PUBLIC_RSA))
}, async (payload, done) => {
	// Get user on database with token
    let user = await userRepository.getById(payload.id).select("+token")
	// Check exists user on database and token
	if(!user || !user.token) return done(null, false)
	// Successful JWT authentication
	return done(null, user)
})

passport.use(jsonWebTokenStrategy)

module.exports = (req,res,next) => {
	// set Error Message with Custom Callback
	passport.authenticate("jwt", (error, user) => {
		const token = getBearerToken(req.headers.authorization)
        const lastAccess = moment(user.ultimo_login), now = moment()
		const lastAccessMinutes = now.diff(lastAccess, "minutes") 

        // If the token is not for the same user, reject
		if(token && token != user.token) return res.status(401).json({ error: "Não autorizado" })
        // If there is any error or there is no user with the id in the token, reject
		if(error || !user) return res.status(401).json({ error: "Não autorizado" })
		// If the time difference is less than 30 minutes, issue an invalid session
        if(lastAccessMinutes > Number(SESSION_LIFETIME)) return res.status(401).json({ error: "Sessão inválida" })

		req.user = user.toObject()
		return next()
	})(req,res,next)
}