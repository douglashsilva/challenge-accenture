/* eslint-disable no-undef */
const Uuid = require("../../../../src/utils/helpers/uuid")
const uuid = new Uuid()

describe('Uuid Helper', () => {
    it('Should create and validate uuid', () => {
        const id = uuid.create()
        expect(typeof id).toBe("string")
        const validate = uuid.validate(id)
        expect(validate).toBeTruthy()
    })
})