const mongoose = require('mongoose');
const dbConfig = require('../config/db.config');

const connect = async () => {
    return mongoose.connect( dbConfig.connectionUri,
        {
            useUnifiedTopology: true,
            useNewUrlParser:true,
            useFindAndModify: false,
        }
    );
}

const disconnect = async () => {
    return mongoose.disconnect();
}

module.exports = {
    connect,
    disconnect,
}