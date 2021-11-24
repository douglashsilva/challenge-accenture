const router = require('express').Router()
const fg = require('fast-glob')

module.exports = app => {
  app.use('/api', router)
  app.get('*', (req,res) => res.status(404).json({ mensagem: "Página não encontrada" }))

  fg.sync('**/src/main/routes/**routes.js')
  .forEach((route) => require(`../../../${route}`)(router))
}
