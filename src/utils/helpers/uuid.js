const { validate: ValidateUUID, version: ValidateVersion, v4 } = require("uuid")

module.exports = class Uuid {
    /**
     * Generate UUID 
     * @returns {string}
     */
    create(){
        return v4()
    }
    /**
     * Validate UUID
     * @param {string} uuid 
     * @returns {boolean}
     */
    validate(uuid){
        return (ValidateUUID(uuid) && ValidateVersion(uuid) === 4)
    }
}