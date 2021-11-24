const { adapt } = require('../adapters/express-router-adapter')
const SignupRouterComposer = require('../composers/signup-router-composer')

module.exports = router => {
  router.post('/signup', adapt(SignupRouterComposer.compose()))
}
