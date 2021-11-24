const { adapt } = require('../adapters/express-router-adapter')
const SigninRouterComposer = require('../composers/signin-router-composer')

module.exports = router => {
  router.post('/signin', adapt(SigninRouterComposer.compose()))
}
