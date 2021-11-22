const userRepository = require('../database/repository/User');
const { createResponse, comparePassword, unauthorizedResponse } = require('../utils/helpers');
const httpStatus = require('../utils/httpStatus');
const jwt = require('jsonwebtoken');
const config = require('../config')
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    const body = req.body;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(body.password, salt);

    userRepository.saveUser({
        name: body.name,
        email: body.email,
        password: hashedPassword   
    }).then(user => {
        const token = jwt.sign({id: user.id}, config.jwtSecret);
        const response = createResponse('Success to add user', httpStatus.OK, {
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        });
        res.status(httpStatus.OK).json(response);
    }).catch(err => {
        const response = createResponse('Error', httpStatus.BadRequest, err.message);
        res.status(httpStatus.BadRequest).json(response);
    })
    
}

const loginUser = async (req, res) => {
    const body = req.body;

    try {
        const user = await userRepository.getUserByEmail(body.email);
        if (!user) {
            throw new Error('User not found');
        }

        const isValid = await comparePassword(body.password, user.password);
        if (!isValid) {
            throw new Error('Invalid password');
        }

        const response = createResponse('Success to login', httpStatus.OK, {
            id: user.id,
            name: user.name,
            email: user.email,
            token: jwt.sign({id: user.id}, config.jwtSecret)
        });

        res.status(httpStatus.OK).json(response);
    } catch (err) {
        if (err.message == 'User not found') {
            const response = createResponse(err.message, httpStatus.NotFound, {error: err.message});
            res.status(httpStatus.NotFound).json(response);
        }else {
            const response = createResponse(err.message, httpStatus.UnproccessableEntity, {error: err.message});
            res.status(httpStatus.UnproccessableEntity).json(response);
        }
        
    }

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

const updateUser = async (req, res) => {
    const body = req.body;
    const params = req.params;

    try {
        if (req.userId != params.id) {
            throw new Error('Unauthorized');
        }

        const user = await userRepository.updateUser(params.id, body);
        if (!user) {
            throw new Error('User not found');
        }

        const response = createResponse('Success to update user', httpStatus.OK, user);
        res.status(httpStatus.OK).json(response);
        
    } catch (error) {
        let response;
        switch (error.message) {
            case 'Unauthorized':
                response = unauthorizedResponse();
                res.status(httpStatus.Unauthorized).json(response);
                break;
            case 'User not found':
                response = createResponse('Error', httpStatus.NotFound, error.message);
                res.status(httpStatus.NotFound).json(response);
            default:
                break;
        }

    }
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

const getUserActivities = async (req, res) => {
    const params = req.params;
    try {
        if (params.id !== req.userId) {
            const response = unauthorizedResponse();
            res.status(httpStatus.Unauthorized).json(response);
        }
        const activities = await userRepository.getUserActivities(params.id);
        const response = createResponse('Success to get user activities', httpStatus.OK, activities);
        res.status(httpStatus.OK).json(response);
    } catch (error) {
        if (error.message === 'Activity not found') {
            const response = createResponse('Error', httpStatus.NotFound, {error: error.message});
            res.status(httpStatus.NotFound).json(response);
        } 

        const response = createResponse('Error', httpStatus.UnproccessableEntity, {error: error.message});
        res.status(httpStatus.UnproccessableEntity).json(response);
    }
}

module.exports = {
    registerUser,
    getUsers,
    updateUser,
    deleteUser,
    loginUser,
    getUserActivities
}