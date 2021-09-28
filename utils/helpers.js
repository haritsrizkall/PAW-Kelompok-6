const httpStatus = require("./httpStatus");

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
module.exports = {
    createResponse,
    unauthorizedResponse
}