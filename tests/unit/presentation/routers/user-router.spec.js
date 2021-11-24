/* eslint-disable no-undef */
const UserRouter = require("../../../../src/presentation/routers/user-router")

const userRouter = new UserRouter({
    userUseCase: {
        getUser: jest.fn().mockResolvedValue(true)
    }
})

describe('User Router', () => {

    it('Should return 200 with valid id', async () => {
        const {  statusCode } = await userRouter.route({
            user: {
                id: "id@test"
            }
        })
        expect(statusCode).toBe(200) 
    })

    it('Should return 500 if no httpRequest is provided', async () => {
        const {  statusCode } = await userRouter.route()
        expect(statusCode).toBe(500) 
    })

})