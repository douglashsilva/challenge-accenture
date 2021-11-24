/* eslint-disable no-undef */
const SignupUseCase = require("../../../src/domain/usecases/signup-usecase")

const fakeUser = {
    id: "id@test",
    nome: "nome@test",
    email: "email@test",
    senha: "senha@test",
    data_criacao: "criacao@test",
    data_atualizacao: "atualizacao@test",
    token: "token@test",
    ultimo_login: "ultimo@test"
}

const signupUseCase = new SignupUseCase({
    jsonWebToken: {
        create: jest.fn().mockResolvedValue("token@test")
    },
    userRepository: {
        create: jest.fn().mockResolvedValue({
            ...fakeUser,
            save: jest.fn().mockImplementation(async () => {})
        })
    }
})

describe('Signup Usecase', () => {
    it('Should signup with correct user data', async () => {
        const sut = await signupUseCase.signup(fakeUser)
        expect(sut).toBe(fakeUser)
    })
    it('Should signup with correct and exists email', async () => {
        signupUseCase.userRepository = {
            create: jest.fn().mockResolvedValue({
                ...fakeUser,
                save: jest.fn().mockImplementation(async () => {
                    function CustomException(message,code){
                        let error = new Error(message)
                        error.code = code
                        return error
                    }
                    CustomException.prototype = Object.create(Error.prototype)
                    throw new CustomException('duplicated unique key index', 11000)
                })
            })
        }
        const sut = await signupUseCase.signup(fakeUser)
        expect(sut).toBeNull()
    })
    it('Should signup with incorrect user data', async () => {
        signupUseCase.userRepository = {
            create: jest.fn().mockResolvedValue({
                ...fakeUser,
                save: jest.fn().mockImplementation(async () => {
                    throw new Error("error@test")
                })
            })
        }
        try{
            await signupUseCase.signup(fakeUser)
        }catch(e){
            expect(e.name).toBe((new Error("error@test")).name)
        }
    })
})