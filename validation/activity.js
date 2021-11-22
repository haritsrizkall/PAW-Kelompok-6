const joi = require('joi');

const createActivityValidation = {
    body: joi.object().keys({
        title: joi.string().required(),
        description: joi.string().required(),
        status: joi.string().required(),
        deadline: joi.string().required(),
        status: joi.string().required(),
        created_at: joi.string().required(),
        updated_at: joi.string().required(),
    })
}