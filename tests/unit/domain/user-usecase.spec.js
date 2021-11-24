/* eslint-disable no-undef */
const UserUseCase = require("../../../src/domain/usecases/user-usecase")

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

const userUseCase = new UserUseCase({
    userRepository: {
        getById: jest.fn().mockImplementation(() => ({
            select: jest.fn().mockResolvedValue(fakeUser)
        }))
    }
})

describe('User Usecase', () => {
    it('Should get user data by id', async () => {
        const sut = await userUseCase.getUser("id@test")
        expect(sut).toBe(fakeUser)
    })
    
})