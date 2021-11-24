const cors = require('../middlewares/cors')
const jsonParser = require('../middlewares/json-parser')
const contentType = require('../middlewares/content-type')
const morgan = require("morgan")

const { SERVER_ENVIRONMENT } = process.env

module.exports = (app) => {
  app.disable('x-powered-by')
  app.use(cors)
  app.use(jsonParser)
  app.use(contentType)

  if(SERVER_ENVIRONMENT === "development"){
    app.use(morgan("dev"))
  }
}
