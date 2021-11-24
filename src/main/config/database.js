/* eslint-disable no-undef */
const mongoose = require("mongoose")
const { 
	MONGO_HOST,
	MONGO_DATABASE,
	MONGO_USERNAME,
	MONGO_PASSWORD,
} = process.env

const MONGO_URI = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:27017/${MONGO_DATABASE}?authSource=admin`

mongoose.connect(MONGO_URI, {
	useNewUrlParser: true, 
	useUnifiedTopology: true,
})

mongoose.connection.on("connected", () => console.log("INFO: Database connected"))
mongoose.connection.on("error", () => console.log("INFO: Database not connected"))

module.exports = mongoose