const activityRepository = require('../database/repository/Activity');
const { createResponse } = require('../utils/helpers');
const httpStatus = require('../utils/httpStatus');

const addActivity = (req, res) => {
    const body = req.body;
    
    activityRepository.saveActivity(body).then(activity => {
        const response = createResponse('Success to add activity', httpStatus.OK, activity);
        res.status(httpStatus.OK).json(response);
    }).catch(err => {
        const response = createResponse('Error', httpStatus.UnproccessableEntity, err.message);
        res.status(httpStatus.UnproccessableEntity).json(response);
    })
    
}

const getActivity = (req, res) => {
    const params = req.params;
    if (params.id) {
        activityRepository.getActivity(params.id).then(activity => {
            if (!activity) {
                const response = createResponse('Error', httpStatus.BadRequest, 'Activity not found');
                res.status(httpStatus.BadRequest).json(response);
            }
            const response = createResponse('List activity by id', httpStatus.OK, activity);
            res.status(httpStatus.OK).json(response);
        }).catch(err => {
            const response = createResponse('Error', httpStatus.UnproccessableEntity, err.message);
            res.status(httpStatus.UnproccessableEntity).json(response);
        })
    }else {
        activityRepository.getActivity().then(activities => {
            const response = createResponse('List all activities', httpStatus.OK, activities);
            res.status(httpStatus.OK).json(response);
        }).catch(err => {
            const response = createResponse('Error', httpStatus.UnproccessableEntity, err.message);
            res.status(httpStatus.UnproccessableEntity).json(response);
        })
    }
}

const updateActivity = (req, res) => {
    const body = req.body;
    const params = req.params;
    activityRepository.updateActivity(params.id, body).then(activity => {
        if (!activity) {
            const response = createResponse('Error', httpStatus.BadRequest, 'Activity not found');
            res.status(httpStatus.BadRequest).json(response);
        }
        const response = createResponse('Success to update activity', httpStatus.OK, activity);
        res.status(httpStatus.OK).json(response);
    }).catch(err => {
        const response = createResponse('Error', httpStatus.UnproccessableEntity, err.message);
        res.status(httpStatus.UnproccessableEntity).json(response);
    });
}

const deleteActivity = (req, res) => {
    const params = req.params;
    activityRepository.deleteActivity(params.id).then(activity => {
        if (!activity) {
            const response = createResponse('Error', httpStatus.BadRequest, 'Activity not found');
            res.status(httpStatus.BadRequest).json(response);
        }
        const response = createResponse('Success to delete activity', httpStatus.OK, activity);
        res.status(httpStatus.OK).json(response);
    }).catch(err => {
        const response = createResponse('Error', httpStatus.UnproccessableEntity, err.message);
        res.status(httpStatus.UnproccessableEntity).json(response);
    }
    );
}
module.exports = {
    addActivity,
    getActivity,
    updateActivity,
    deleteActivity
}