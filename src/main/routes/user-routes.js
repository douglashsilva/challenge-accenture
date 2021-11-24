const { adapt } = require('../adapters/express-router-adapter')
const UserRouterComposer = require('../composers/user-router-composer')

const passport = require("../middlewares/passport")

module.exports = router => {
  router.get('/user', passport, adapt(UserRouterComposer.compose()))
}
