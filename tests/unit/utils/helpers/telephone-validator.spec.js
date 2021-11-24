/* eslint-disable no-undef */
const { InvalidParamError } = require("../../../../src/utils/errors")
const TelephoneValidator = require("../../../../src/utils/helpers/telephone-validator")

const telephoneValidator = new TelephoneValidator()

describe('TelephoneValidator Helper', () => {
    it('Should return array of two objects', () => {
        const telephonesPayload = [
            { ddd: 11, numero: 999392349 },
            { ddd: 11, numero: 999392349 },
            { ddd: 1, numero: 999392349 }
        ]
        const validTelephones = telephoneValidator.isValid(telephonesPayload)
        expect(validTelephones.length).toBe(2)
    })
    it('Should return error with invalid telephones list', () => {
        try{
            telephoneValidator.isValid("")
        }catch(e){
            expect(e.message).toBe((new InvalidParamError("telefones")).message)
        }
    })
    it('Should return array of two objects', () => {
        const telephonesPayload = [
            { ddd: 11, numero: 999392349 },
            { ddd: 11, numero: 999392349 },
            { numero: 999392349 }
        ]
        const validTelephones = telephoneValidator.isValid(telephonesPayload)
        expect(validTelephones.length).toBe(2)
    })
})