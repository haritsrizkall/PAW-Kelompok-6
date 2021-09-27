require('dotenv').config();

const config = {
    database: {
        "uri": process.env.DB_URI,
    }
}

module.exports = config;