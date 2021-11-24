/* eslint-disable no-undef */
const SignupRouter = require("../../../../src/presentation/routers/signup-router")
const EmailValidator = require("../../../../src/utils/helpers/email-validator")
const TelephoneValidator = require("../../../../src/utils/helpers/telephone-validator")

const signupRouter = new SignupRouter({
    signupUseCase: {
        signup: jest.fn().mockResolvedValue(false)
    },
    emailValidator: new EmailValidator(),
    telephoneValidator: new TelephoneValidator()
})

describe('Signup Router', () => {
    it('Should return 400 if notfound nome', async () => {
        const {  statusCode } = await signupRouter.route({
            body: {}
        })
        expect(statusCode).toBe(400)
    })
    it('Should return 400 if notfound email', async () => {
        const {  statusCode } = await signupRouter.route({
            body: {
                nome: "nome@test"
            }
        })
        expect(statusCode).toBe(400)
    })
    it('Should return 400 if notfound senha', async () => {
        const {  statusCode } = await signupRouter.route({
            body: {
                nome: "nome@test",
                email: "email@test"
            }
        })
        expect(statusCode).toBe(400)
    })
    it('Should return 400 if notfound telefones', async () => {
        const {  statusCode } = await signupRouter.route({
            body: {
                nome: "nome@test",
                email: "email@test",
                senha: "senha@test"
            }
        })
        expect(statusCode).toBe(400)
    })
    it('Should return 400 if and invalid email provided', async () => {
        const {  statusCode } = await signupRouter.route({
            body: {
                nome: "nome@test",
                email: "invalid_email",
                senha: "senha@test",
                telefones: [{ ddd: 11, numero: 999392349 }]
            }
        })
        expect(statusCode).toBe(400)
    })
    it('Should return 400 if and invalid telefones provided', async () => {
        const {  statusCode } = await signupRouter.route({
            body: {
                nome: "nome@test",
                email: "email@test.com",
                senha: "senha@test",
                telefones: [{ ddd: 1, numero: 999392349 }]
            }
        })
        expect(statusCode).toBe(400)
    })
    it('Should return 400 if and invalid email provided exists on database', async () => {
        const {  statusCode } = await signupRouter.route({
            body: {
                nome: "nome@test",
                email: "email@test.com",
                senha: "senha@test",
                telefones: [{ ddd: 11, numero: 999392349 }]
            }
        })
        expect(statusCode).toBe(400)
    })
    it('Should return 201 when valid user are provided', async () => {
        signupRouter.signupUseCase = {
            signup: jest.fn().mockResolvedValue(true)
        }
        const {  statusCode } = await signupRouter.route({
            body: {
                nome: "nome@test",
                email: "email@test.com",
                senha: "senha@test",
                telefones: [{ ddd: 11, numero: 999392349 }]
            }
        })
        expect(statusCode).toBe(201)
    })
    it('Should return 500 if no httpRequest is provided', async () => {
        const {  statusCode } = await signupRouter.route()
        expect(statusCode).toBe(500)
    })
})