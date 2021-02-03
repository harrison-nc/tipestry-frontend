const mongoose = require('mongoose');

const { DATABASE_URL } = process.env;

const connect = async () => {

    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    };

    return mongoose.connect(DATABASE_URL, options);
};

const close = () => mongoose.connection.close();

module.exports = {
    connect,
    close: close
};
