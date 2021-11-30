const express = require('express');
const app = express();
const morgan = require('morgan');
const config = require('./config');
const database = require('./database/client');
const Activity = require('./router/Activity');
const multer = require('multer')
const multerS3 = require('multer-s3')
const AWS = require('aws-sdk');
const User = require('./router/Users');
const cors = require('cors');
const s3 = new AWS.S3({
    accessKeyId: config.aws.accessKeyId,
    secretAccessKey: config.aws.secretAccessKey,
})

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

// var upload = multer({
//     mimetype: 'image/jpeg',
//     storage: multerS3({
//         s3: s3,
//         bucket:config.aws.bucketName,
//         metadata: function (req, file, cb) {
//             cb(null, { fieldName: file.fieldname });
//         },
//         key: function (req, file, cb) {
//             cb(null, req)
//         }
//     })
//  })
// const storage = multer.memoryStorage({
//     destination: function (req, file, cb) {
//         cb(null, '')
//     }
// })

// const upload = multer({storage}).single('avatar');

// app.post('/test', upload, (req, res) => {
//     let myFile = req.file.originalname.split('.');
//     let fileExtension = myFile[myFile.length - 1];

//     s3.upload({
//         Bucket: config.aws.bucketName,
//         Key: `${req.body.user_id}`,
//         Body: req.file.buffer,
//         ACL: 'public-read'
//     }, (err, data) => {
//         if (err) {
//             res.status(500).json({
//                 message: 'error',
//             })
//         }
//         res.status(200).json({
//             message: 'success',
//             data: data
//         })
//     })

// });

app.get('/', (req, res) => {
    res.send(`Please ${config.database.uri}`);
});

app.listen(process.env.PORT || 5000);    

module.exports = app;