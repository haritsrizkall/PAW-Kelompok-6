const userRepository = require('../database/repository/User');
const { createResponse, comparePassword, unauthorizedResponse } = require('../utils/helpers');
const httpStatus = require('../utils/httpStatus');
const jwt = require('jsonwebtoken');
const config = require('../config')
const bcrypt = require('bcrypt');
const AWS = require('aws-sdk');
const { registerValidation, loginValidation } = require('../validation/users');
const s3 = new AWS.S3({
    accessKeyId: config.aws.accessKeyId,
    secretAccessKey: config.aws.secretAccessKey,
})

const registerUser = async (req, res) => {

    try {
        const body = req.body;
        const validatedBody = await registerValidation.validateAsync(body, {abortEarly: false});
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(body.password, salt);

        const user = await userRepository.saveUser({
            name: validatedBody.name,
            email: validatedBody.email,
            password: hashedPassword   
        });

        const token = jwt.sign({id: user.id}, config.jwtSecret);
        const response = createResponse('Success to add user', httpStatus.OK, {
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        });
        res.status(httpStatus.OK).json(response);
    } catch (error) {
        const response = createResponse('Error', httpStatus.BadRequest, {error: error.details});
        res.status(httpStatus.BadRequest).json(response);
    }
    
}

const loginUser = async (req, res) => {
    const body = req.body;

    try {
        const validatedBody = await loginValidation.validateAsync(body, {abortEarly: false});
        
        const user = await userRepository.getUserByEmail(validatedBody.email);
        if (!user) {
            throw new Error('User not found');
        }

        const isValid = await comparePassword(validatedBody.password, user.password);
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

const getUsers = async (req, res) => {
    const params = req.params;
    try {
        if (params.id) {
            const user = await userRepository.getUser(params.id);
            if (!user) {
                throw new Error('User not found')
            }
            const response = createResponse('User by id', httpStatus.OK, user);
            res.status(httpStatus.OK).json(response);
        }else {
            const users = await userRepository.getUser();
            const response = createResponse('List all users', httpStatus.OK, users);
            res.status(httpStatus.OK).json(response);
        }
    } catch (error) {
        if (error.message == 'User not found') {
            const response = createResponse(error.message, httpStatus.NotFound, {error: error.message});
            res.status(httpStatus.NotFound).json(response);
        }

        const response = createResponse('Error', httpStatus.BadRequest, {error: error.message});
        res.status(httpStatus.BadRequest).json(response);
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
                response = createResponse('Error', httpStatus.NotFound, {error: error.message});
                res.status(httpStatus.NotFound).json(response);
            default:
                response = createResponse('Error', httpStatus.BadRequest, {error: error.message});
                res.status(httpStatus.BadRequest).json(response);
                break;
        }

    }
}

const deleteUser = async (req, res) => {
    const body = req.body;
    const params = req.params;
    try {
        const user = await userRepository.deleteUser(params.id);
        if (!user) {
            throw new Error('User not found');
        }
        const response = createResponse('Success to delete user', httpStatus.OK, user);
        res.status(httpStatus.OK).json(response);

    } catch (error) {
        let response;
        switch (error.message) {
            case 'Unauthorized':
                response = unauthorizedResponse();
                res.status(httpStatus.Unauthorized).json(response);
                break;
            case 'User not found':
                response = createResponse('Error', httpStatus.NotFound, {error: error.message});
                res.status(httpStatus.NotFound).json(response);
            default:
                response = createResponse('Error', httpStatus.BadRequest, {error: error.message});
                res.status(httpStatus.BadRequest).json(response);
                break;
        }
    }
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

const uploadAvatar = async (req, res) => {
    const params = req.params;
    if (params.id !== req.userId) {
        const response = unauthorizedResponse();
        res.status(httpStatus.Unauthorized).json(response);    
    }

    s3.upload({
        Bucket: config.aws.bucketName,
        Key: `${req.userId}`,
        Body: req.file.buffer,
        ACL: 'public-read'
    }, async (err, data) => {
        if (err) {
            res.status(500).json({
                message: 'error',
            })
        }
        try {
            const user = await userRepository.updateUser(params.id, {
                avatar: data.Location
            });
        } catch (error) {
            response = createResponse('Error', httpStatus.BadRequest, {error: error.message});
            res.status(httpStatus.BadRequest).json(response);
        }
        res.status(200).json({
            message: 'success',
            data: data
        })
    })
}

module.exports = {
    registerUser,
    getUsers,
    updateUser,
    deleteUser,
    loginUser,
    getUserActivities,
    uploadAvatar
}