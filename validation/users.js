const joi = require("joi");

const registerValidation = {
    body: joi.object.keys({
        name: joi.string().required(),
        email: joi.string().required().email(),
        password: joi.string().required().min(6),
    })
}

const loginValidation = {
    body: joi.object().keys({
        email: joi.string().required().email(),
        password: joi.string().required().min(6),
    })
}