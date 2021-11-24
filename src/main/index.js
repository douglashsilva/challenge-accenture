/* eslint-disable no-undef */
const app = require("./config/app")

const { SERVER_PORT } = process.env

app.listen(SERVER_PORT, () => console.log(`Server running at http://localhost:${SERVER_PORT}`))
