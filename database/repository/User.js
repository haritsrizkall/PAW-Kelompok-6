const { userModel } = require('../model/User');

const saveUser = async (data) => {
    return await userModel.create(data);
}

const getUser = async (id) => {
    if(id) {
        return await userModel.findById(id);
    }
    return await userModel.find();
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
    deleteUser
};