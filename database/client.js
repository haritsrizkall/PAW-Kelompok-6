const mongoose = require('mongoose');
const config = require('../config');

const connect = async () => {
    try {
        await mongoose.connect(config.database.uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }catch(err){
        console.log('Connect to database failed. Error : ', err);
    }   
    
} 

module.exports = {
    connect
}
