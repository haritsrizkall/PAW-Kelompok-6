const userRepository = require('../database/repository/User');
const httpStatus = require('../utils/httpStatus');

const addUser = (req, res) => {
    const body = req.body;
    
    userRepository.saveUser(body).then(user => {
        res.status(httpStatus.OK).json({
            message: user
        });
    }).catch(err => {
        res.status(httpStatus.BadRequest).json({
            message: err.message
        });
    })
    
}

const getUsers = (req, res) => {
    const params = req.params;
    if (params.id) {
        userRepository.getUser(params.id).then(user => {
            res.status(httpStatus.OK).json({
                message: user
            });
        }).catch(err => {
            res.status(httpStatus.BadRequest).json({
                message: err.message
            });
        })
    }else {
        userRepository.getUser().then(users => {
            res.status(httpStatus.OK).json({
                message: users
            });
        }).catch(err => {
            res.status(httpStatus.BadRequest).json({
                message: err.message
            });
        })
    }
}

const updateUser = (req, res) => {
    const body = req.body;
    const params = req.params;
    userRepository.updateUser(params.id, body).then(user => {
        res.status(httpStatus.OK).json({
            message: user
        });
    }).catch(err => {
        res.status(httpStatus.BadRequest).json({
            message: err.message
        });
    });
}

const deleteUser = (req, res) => {
    const body = req.body;
    const params = req.params;
    userRepository.deleteUser(params.id).then(user => {
        res.status(httpStatus.OK).json({
            message: user
        });
    }).catch(err => {
        res.status(httpStatus.BadRequest).json({
            message: err.message
        });
    }
    );
}
module.exports = {
    addUser,
    getUsers,
    updateUser,
    deleteUser
}