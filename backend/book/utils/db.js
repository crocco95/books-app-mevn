const mongoose = require('mongoose');
const dbConfig = require('../config/db.config');

const connect = () => {
    return mongoose.connect( dbConfig.connectionUri,
        {
            useUnifiedTopology: true,
            useNewUrlParser:true
        },
        (o) => console.log({
            log:'DB Connected successfully!',
            o: o
        })
    );
}

module.exports = {
    connect,
}