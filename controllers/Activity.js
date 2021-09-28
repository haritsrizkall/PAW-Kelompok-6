const activityRepository = require('../database/repository/Activity');
const httpStatus = require('../utils/httpStatus');

const addActivity = (req, res) => {
    const body = req.body;
    
    userRepository.saveActivity(body).then(activity => {
        res.status(httpStatus.OK).json({
            message: activity
        });
    }).catch(err => {
        res.status(httpStatus.BadRequest).json({
            message: err.message
        });
    })
    
}

const getActivity = (req, res) => {
    const params = req.params;
    if (params.id) {
        userRepository.getActivity(params.id).then(activity => {
            res.status(httpStatus.OK).json({
                message: activity
            });
        }).catch(err => {
            res.status(httpStatus.BadRequest).json({
                message: err.message
            });
        })
    }else {
        userRepository.getActivity().then(activities => {
            res.status(httpStatus.OK).json({
                message: activities
            });
        }).catch(err => {
            res.status(httpStatus.BadRequest).json({
                message: err.message
            });
        })
    }
}

const updateActivity = (req, res) => {
    const body = req.body;
    const params = req.params;
    userRepository.updateActivities(params.id, body).then(activity => {
        res.status(httpStatus.OK).json({
            message: activity
        });
    }).catch(err => {
        res.status(httpStatus.BadRequest).json({
            message: err.message
        });
    });
}

const deleteActivity = (req, res) => {
    const body = req.body;
    const params = req.params;
    userRepository.deleteActivity(params.id).then(activity => {
        res.status(httpStatus.OK).json({
            message: activity
        });
    }).catch(err => {
        res.status(httpStatus.BadRequest).json({
            message: err.message
        });
    }
    );
}
module.exports = {
    addActivity,
    getActivity,
    updateActivity,
    deleteActivity
}