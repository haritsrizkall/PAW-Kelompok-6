const { userModel } = require('../model/User');
const { activityModel } = require('../model/Activity');

const saveUser = async (data) => {
    const user = new userModel(data);
    return await userModel.create(user);
}

const getUser = async (id) => {
    if(id) {
        return await userModel.findById(id);
    }
    return await userModel.find();
}

const getUserActivities = async (userId) => {
    return await activityModel.find({ userId });
}

const getUserByEmail = async (email) => {
    return await userModel.findOne({ email });
}

const updateUser = async (id, data) => {
    return await userModel.findByIdAndUpdate(id, data, { new: true });
}

const deleteUser = async (id) => {
    return await userModel.findByIdAndDelete(id);
}

module.exports = userRepository = {
    saveUser,
    getUser,
    updateUser,
    deleteUser,
    getUserByEmail,
    getUserActivities
};