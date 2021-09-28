const userRepository = require('../database/repository/User');
const { createResponse } = require('../utils/helpers');
const httpStatus = require('../utils/httpStatus');

const addUser = (req, res) => {
    const body = req.body;
    
    userRepository.saveUser(body).then(user => {
        const response = createResponse('Success to add user', httpStatus.OK, user);
        res.status(httpStatus.OK).json(response);
    }).catch(err => {
        const response = createResponse('Error', httpStatus.BadRequest, err.message);
        res.status(httpStatus.BadRequest).json(response);
    })
    
}

const getUsers = (req, res) => {
    const params = req.params;
    if (params.id) {
        userRepository.getUser(params.id).then(user => {
            if (!user) {
                const response = createResponse('Error', httpStatus.BadRequest, 'User not found');
                res.status(httpStatus.BadRequest).json(response);
            }
            const response = createResponse('User by id', httpStatus.OK, user);
            res.status(httpStatus.OK).json(response);
        }).catch(err => {
            const response = createResponse('Error', httpStatus.BadRequest, err.message);
            res.status(httpStatus.BadRequest).json(response);
        })
    }else {
        userRepository.getUser().then(users => {
            const response = createResponse('List all users', httpStatus.OK, users);
            res.status(httpStatus.OK).json(response);
        }).catch(err => {
            const response = createResponse('Error', httpStatus.BadRequest, err.message);
            res.status(httpStatus.BadRequest).json(response);
        })
    }
}

const updateUser = (req, res) => {
    const body = req.body;
    const params = req.params;
    userRepository.updateUser(params.id, body).then(user => {
        if (!user) {
            const response = createResponse('Error', httpStatus.BadRequest, 'User not found');
            res.status(httpStatus.BadRequest).json(response);
        }
        const response = createResponse('Success to update user', httpStatus.OK, user);
        res.status(httpStatus.OK).json(response);
    }).catch(err => {
        const response = createResponse('Error', httpStatus.BadRequest, err.message);
        res.status(httpStatus.BadRequest).json(response);
    });
}

const deleteUser = (req, res) => {
    const body = req.body;
    const params = req.params;
    userRepository.deleteUser(params.id).then(user => {
        if (!user) {
            const response = createResponse('Error', httpStatus.BadRequest, 'User not found');
            res.status(httpStatus.BadRequest).json(response);
        }
        const response = createResponse('Success to delete user', httpStatus.OK, user);
        res.status(httpStatus.OK).json(response);
    }).catch(err => {
        const response = createResponse('Error', httpStatus.BadRequest, err.message);
        res.status(httpStatus.BadRequest).json(response);
    }
    );
}
module.exports = {
    addUser,
    getUsers,
    updateUser,
    deleteUser
}