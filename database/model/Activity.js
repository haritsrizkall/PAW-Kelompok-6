const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true,
        default: false
    },
    deadline: {
        type: String,
        required: true
    }
}, {collection: 'activities', timestamps: true});

module.exports = {
    activityModel : mongoose.model('Activity', activitySchema),

}