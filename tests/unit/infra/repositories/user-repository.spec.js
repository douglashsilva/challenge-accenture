/* eslint-disable no-undef */
const UserRepository = require('../../../../src/infra/repositories/user-repository')
const { MissingParamError } = require('../../../../src/utils/errors')
const userRepository = new UserRepository()

const findAndCreateMockReturnValue = "user@test"

jest.mock("../../../../src/domain/models/user-model", () => ({
    findOne: jest.fn().mockReturnValue(findAndCreateMockReturnValue),
    create: jest.fn().mockReturnValue(findAndCreateMockReturnValue)
}))

describe('User Repository', () => {
    it('Should get user by id', async () => {
        const sut = await userRepository.getById("id@test")
        expect(sut).toBe(findAndCreateMockReturnValue)
    })
    it('Should get user by id without required id param', async () => {
        try{
            await userRepository.getById()
        }catch(e){
            expect(e.message).toBe(new MissingParamError("id").message)
        }
    })
    it('Should get user by email', async () => {
        const sut = await userRepository.getByEmail("id@test")
        expect(sut).toBe(findAndCreateMockReturnValue)
    })
    it('Should get user by email without required email param', async () => {
        try{
            await userRepository.getByEmail()
        }catch(e){
            expect(e.message).toBe(new MissingParamError("email").message)
        }
    })
    it('Should create user', async () => {
        const sut = await userRepository.create(findAndCreateMockReturnValue)
        expect(sut).toBe(findAndCreateMockReturnValue)
    })
    it('Should create user without required user param', async () => {
        try{
            await userRepository.create()
        }catch(e){
            expect(e.message).toBe(new MissingParamError("user").message)
        }
    })
})