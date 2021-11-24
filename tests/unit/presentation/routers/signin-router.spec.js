/* eslint-disable no-undef */
const SigninRouter = require("../../../../src/presentation/routers/signin-router")
const EmailValidator = require("../../../../src/utils/helpers/email-validator")

const signinRouter = new SigninRouter({
    signinUseCase: {
        signin: jest.fn().mockResolvedValue(false)
    },
    emailValidator: new EmailValidator()
})

describe('Signin Router', () => {

    it('Should return 400 if and notfound email', async () => {
        const {  statusCode } = await signinRouter.route({
            body: {
                senha: "senha@test" 
            }
        })
        expect(statusCode).toBe(400)
    })

    it('Should return 400 if and invalid email provided', async () => {
        const {  statusCode } = await signinRouter.route({
            body: {
                email: "invalid_email",
                senha: "senha@test" 
            }
        })
        expect(statusCode).toBe(400)
    })

    it('Should return 400 if and notfound password', async () => {
        const {  statusCode } = await signinRouter.route({
            body: {
                email: "teste@teste.com" 
            }
        })
        expect(statusCode).toBe(400)
    })

    it('Should return 401 when invalid credentials are provided', async () => {
        const {  statusCode } = await signinRouter.route({
            body: {
                email: "teste@teste.com",
                senha: "teste@teste" 
            }
        })
        expect(statusCode).toBe(401)
    })

    it('Should return 200 when valid credentials are provided', async () => {
        signinRouter.signinUseCase = {
            signin: jest.fn().mockResolvedValue(true)
        }
        const {  statusCode } = await signinRouter.route({
            body: {
                email: "teste@teste.com",
                senha: "teste@teste" 
            }
        })
        expect(statusCode).toBe(200)
    })

    it('Should return 500 if no httpRequest is provided', async () => {
        const {  statusCode } = await signinRouter.route()
        expect(statusCode).toBe(500)
    })
})