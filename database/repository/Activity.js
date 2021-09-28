const { activityModel } = require('../model/Activity');

const saveActivity = async (data) => {
    const activity = new activityModel(data);
    return await activityModel.create(data);
}

const getActivity = async (id) => {
    if(id) {
        return await activityModel.findById(id);
    }
    return await activityModel.find();
}

const updateActivity = async (id, data) => {
    return await activityModel.findByIdAndUpdate(id, data, { new: true });
}

const deleteActivity = async (id) => {
    return await activityModel.findByIdAndDelete(id);
}
module.exports = activityRepository = {
    saveActivity,
    getActivity,
    updateActivity,
    deleteActivity
};