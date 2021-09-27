const mongoose = require('mongoose');
const config = require('../config');

const connect = async () => {
    try {
        await mongoose.connect('mongodb+srv://admin:ugmjayajayajaya@cluster0.ruzcm.mongodb.net/testdb?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }catch(err){
        console.log('Error nih ', err);
    }   
    
    console.log('db connected');
} 

module.exports = {
    connect
}
