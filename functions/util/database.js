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

const close = async () => {
    try {
        await mongoose.connection.close();
    } catch (error) {
        console.debug(error);
    }
};

const withConnection = async (callback) => {
    try {
        await connect();

        try {
            return new Promise((resolve, reject) => {
                try {
                    const result = callback();
                    resolve(result);
                } catch (error) {
                    reject(error);
                }
            }).then(async (value) => {
                await close();
                return value;
            }).catch(async (error) => {
                await close();
                throw error;
            });
        } catch (error) {
            await close();
            throw error;
        }
    } catch (error) {
        throw error;
    }
};

module.exports = {
    connect,
    close,
    withConnection,
};
