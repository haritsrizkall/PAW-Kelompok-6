const express = require('express');
const app = express();
const morgan = require('morgan');
const config = require('./config');
const database = require('./database/client');
const Activity = require('./router/Activity');
const User = require('./router/Users');
const cors = require('cors');

database.connect();

app.use(express.json());
app.use(morgan('combined'));
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})
app.use('/users', User);
app.use('/activities', Activity);
app.use(cors());

app.get('/', (req, res) => {
    res.send(`Please ${config.database.uri}`);
});

app.listen(process.env.PORT || 5000);    

module.exports = app;