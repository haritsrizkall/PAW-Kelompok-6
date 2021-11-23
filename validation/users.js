const joi = require("joi");

const registerValidation = joi.object({
        name: joi.string().required(),
        email: joi.string().required().email().exist(),
        password: joi.string().required().min(6),
    })

const loginValidation = joi.object({
        email: joi.string().required().email(),
        password: joi.string().required().min(6),
    })

module.exports = {
    registerValidation,
    loginValidation
}