const uuid = require("uuid")
const mongoose = require("../../main/config/database")
const BcryptHelper = require("../../utils/helpers/bcrypt")

const bcrypt = new BcryptHelper()

const UserSchema = new mongoose.Schema({
	id: {
		type: String,
		index: true,
		unique: true,
		default: uuid.v4
	},
	nome: {
		type: String,
		require: true,
	},
	email: {
		type: String,
		unique: true,
		require: true,
		lowercase: true
	}, 
	senha: {
		type: String,
		require: true,
		select: false
	},
    telefones: [{
        ddd: {
            type: Number,
            require: true
        },
        numero: {
            type: Number,
            require: true
        }
    }],
    data_criacao: {
        type: Date,
		default: Date.now
    },
    data_atualizacao: {
        type: Date,
		default: Date.now
    },
    ultimo_login: {
        type: Date,
		default: Date.now
    },
    token: {
        type: String
    }
}, { collection: "users" })

UserSchema.pre("save", function(next){
    this.data_atualizacao = Date.now()
	if (!this.isModified("senha")) return next()
	// will only update the password if it is changed in an update.
	this.senha = bcrypt.create(this.senha)
	return next()
})

module.exports = mongoose.model("User", UserSchema)