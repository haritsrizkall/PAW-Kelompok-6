const httpStatus = require("./httpStatus");
const bcrypt = require('bcrypt');

const createResponse = (message, status, data) => {
    return {
        message,
        status,
        data : data || null ,
    };
}

const unauthorizedResponse = () => {
    return {
        message: 'Unauthorized',
        status: httpStatus.Unauthorized,
        data: null,
    }
}

const comparePassword = (password, hash) => {
    return bcrypt.compare(password, hash);
}

module.exports = {
    createResponse,
    unauthorizedResponse,
    comparePassword,
}