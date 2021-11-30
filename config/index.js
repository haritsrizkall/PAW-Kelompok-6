require('dotenv').config();

const config = {
    database: {
        "uri": process.env.DB_URI,
    },
    jwtSecret: process.env.JWT_SECRET,
    aws: {
        "accessKeyId": process.env.AWS_ACCESS_KEY_ID,
        "secretAccessKey": process.env.AWS_SECRET_ACCESS_KEY,
        "bucketName": process.env.AWS_BUCKET_NAME,
    }
}

module.exports = config;