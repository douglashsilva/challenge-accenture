const { InvalidParamError } = require('../errors')

module.exports = class TelephoneValidator {

  /**
   * Validate Telefone and Return Array of Valid
   * @param {array} telephones 
   * @returns {array|boolean}
   */
  isValid (telephones) {
    if(!Array.isArray(telephones)) throw new InvalidParamError('telefones')

    const listOfValidTelephones = telephones.filter((telephone) => {
        const isValidRequired = (telephone.ddd && telephone.numero) ? true : false
        // To proceed with the other validations, it is necessary to contain both fields
        if(!isValidRequired) return isValidRequired
        // Simple type and size validation
        const isValidType = (typeof telephone.ddd === "number" && typeof telephone.numero === "number")
        const isValidLength = (String(telephone.ddd).length == 2 && String(telephone.numero).length >= 8)
        // "All right"
        return isValidType && isValidLength
    })

    // If there is no object in the array, it is because no valid phone was informed
    return listOfValidTelephones.length >= 1 ? listOfValidTelephones : false
  }

}
