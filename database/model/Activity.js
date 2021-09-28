const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
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
        type: Date,
        required: true
    }
}, {collection: 'activities'});

module.exports = {
    activityModel : mongoose.model('Activity', activitySchema),

}