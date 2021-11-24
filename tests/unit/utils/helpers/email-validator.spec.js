/* eslint-disable no-undef */
const EmailValidator = require("../../../../src/utils/helpers/email-validator")
const emailValidator = new EmailValidator()

describe('EmailValidator Helper', () => {
    it('Should validate an valid email', () => {
        expect(emailValidator.isValid("test@teste.com")).toBeTruthy()
    })
    it('Should validate an invalid email', () => {
        expect(emailValidator.isValid("invalid_email")).toBeFalsy()
    })
})