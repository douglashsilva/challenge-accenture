/* eslint-disable no-undef */
const Bcrypt = require("../../../../src/utils/helpers/bcrypt")

const bcrypt = new Bcrypt()
const valueToEncrypt = "bcrypt@test"

describe('Bcrypt Helper', () => {
    it('Should create encrypted string and compare', () => {
        const encrypted = bcrypt.create(valueToEncrypt)
        const compare = bcrypt.compare(valueToEncrypt, encrypted)
        expect(compare).toBeTruthy()
    })
})