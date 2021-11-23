const moment = require('moment');
const activityRepository = require('../database/repository/Activity');
const { createResponse, unauthorizedResponse } = require('../utils/helpers');
const httpStatus = require('../utils/httpStatus');

const addActivity = async (req, res) => {
    const body = req.body;

    try {
        const activity = await activityRepository.saveActivity({
            ...body,
            userId: req.userId,
            deadline: moment(body.deadline).format('YYYY-MM-DD HH:mm:ss')
        });
        const response = createResponse('Success to add activity', httpStatus.OK, activity);
        res.status(httpStatus.OK).json(response);
    } catch (error) {
        const response = createResponse('Error', httpStatus.UnproccessableEntity, error.message);
        res.status(httpStatus.UnproccessableEntity).json(response);
    }
}

const getActivity = async (req, res) => {
    const params = req.params;
    try {
        if (params.id) {
            const activity = await activityRepository.getActivity(params.id);
            if (!activity) {
                throw new Error('Activity not found');
            }
            
            const response = createResponse('Success to get activity', httpStatus.OK, activity);
            res.status(httpStatus.OK).json(response);
        }else {
            const activities = await activityRepository.getActivity();
            const response = createResponse('Success to get all activities', httpStatus.OK, activities);
            res.status(httpStatus.OK).json(response);
        }
    } catch (error) {
        if (error.message === 'Activity not found') {
            const response = createResponse('Error', httpStatus.NotFound, {error: error.message});
            res.status(httpStatus.NotFound).json(response);
        } 

        const response = createResponse('Error', httpStatus.UnproccessableEntity, {error: error.message});
        res.status(httpStatus.UnproccessableEntity).json(response);
    }
}

const updateActivity = async (req, res) => {
    const body = req.body;
    const params = req.params;
    try {

        const activity = await activityRepository.getActivity(params.id);   
        if (!activity) {
            throw new Error('Activity not found');
        }

        await activityRepository.updateActivity(params.id, body);

        if(activity.id != req.userId) {
            throw new Error('Unauthorized');
        }

        const response = createResponse('Success to update activity', httpStatus.OK, activity);
        res.status(httpStatus.OK).json(response);
    } catch (error) {
        let response;
        switch (error.message) {
            case "Unauthorized":
                response = unauthorizedResponse();
                res.status(httpStatus.Unauthorized).json(response);
                break;
            case "Activity not found":
                response = createResponse('Error', httpStatus.NotFound, {error: error.message});
                res.status(httpStatus.NotFound).json(response);
            default:
                response = createResponse('Error', httpStatus.UnproccessableEntity, {error: error.message});
                res.status(httpStatus.NotFound).json(response);
                break;
        }
    }
}

const deleteActivity = async (req, res) => {
    const params = req.params;
    try {
        const activity = await activityRepository.getActivity(params.id);   
        if (!activity) {
            throw new Error('Activity not found');
        }

        if (activity.userId != req.userId) {
            throw new Error('Unauthorized');
        }

        await activityRepository.deleteActivity(params.id);
      
        const response = createResponse('Success to delete activity', httpStatus.OK, activity);
        res.status(httpStatus.OK).json(response);
    } catch (error) {
        let response;
        switch (error.message) {
            case "Unauthorized":
                response = unauthorizedResponse();
                res.status(httpStatus.Unauthorized).json(response);
                break;
            case "Activity not found":
                response = createResponse('Error', httpStatus.NotFound, {error: error.message});
                res.status(httpStatus.NotFound).json(response);
            default:
                response = createResponse('Error', httpStatus.UnproccessableEntity, {error: error.message});
                res.status(httpStatus.NotFound).json(response);
                break;
        }
    }
}
module.exports = {
    addActivity,
    getActivity,
    updateActivity,
    deleteActivity
}