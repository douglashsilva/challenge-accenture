/* eslint-disable no-undef */
const SigninUseCase = require("../../../src/domain/usecases/signin-usecase")
const { MissingParamError } = require("../../../src/utils/errors")

const signinUseCase = new SigninUseCase({
    jsonWebToken: {
        create: jest.fn().mockResolvedValue("token@test")
    },
    bcrypt: {
        compare: jest.fn().mockReturnValue(false)
    },
    userRepository: {
        getByEmail: jest.fn().mockImplementation(() => ({
            select: jest.fn().mockResolvedValue(false)
        }))
    }
})

/* eslint-disable no-undef */
describe('Signin Usecase', () => {
    it('Should signin without email', async () => {
        try{
            await signinUseCase.signin()
        }catch(e){
            expect(e.message).toBe(new MissingParamError('email').message)
        }
    })
    it('Should signin without password', async () => {
        try{
            await signinUseCase.signin("aa")
        }catch(e){
            expect(e.message).toBe(new MissingParamError('senha').message)
        }
    })
    it('Should signin with e-mail not found', async () => {
        const sut = await signinUseCase.signin("test@test","test")
        expect(sut).toBeFalsy()
    })
    it('Should signin with password not match', async () => {
        signinUseCase.userRepository = {
            getByEmail: jest.fn().mockImplementation(() => ({
                select: jest.fn().mockImplementation(() => ({
                    save: jest.fn(),
                    toObject: jest.fn().mockResolvedValue({ id: "test" })
                }))
            }))
        }
        const sut = await signinUseCase.signin("test@test","test")
        expect(sut).toBeFalsy()
    })
    it('Should signin with valid email and password', async () => {
        signinUseCase.bcrypt = {
            compare: jest.fn().mockReturnValue(true)
        }
        const sut = await signinUseCase.signin("test@test","test")
        expect(sut).toEqual({ id: "test" })
    })
})