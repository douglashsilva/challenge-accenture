/* eslint-disable no-undef */
const JsonWebToken = require("../../../../src/utils/helpers/jsonwebtoken")
const jsonWebToken = new JsonWebToken()
const fs = require("fs")
const jwt = require('jsonwebtoken')


describe('JsonWebToken Helper', () => {
    it('Should create token and validate', async () => {
        const token = await jsonWebToken.create({ id: "test" })
        expect(token).toBe(token)
        const validate = await jsonWebToken.validate(token)
        expect(validate).toBeTruthy()
    })
    it('Should return error of jwt create', async () => {
        jest.spyOn(jwt, "sign").mockImplementation(() => {
            throw new Error("Error Jwt Generating")
        })
        try{
            await jsonWebToken.create({ id: "test" })
        }catch(e){
            expect(e.message).toBe((new Error("Error Jwt Generating")).message)
        }
    })

    it('Should return error of jwt verify', async () => {
        jest.spyOn(jwt, "verify").mockImplementation(() => {
            throw new Error("Error Jwt Verify")
        })
        try{
            await jsonWebToken.validate("test")
        }catch(e){
            expect(e.message).toBe((new Error("Error Jwt Verify")).message)
        }
    })
})