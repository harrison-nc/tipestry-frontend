const mongoose = require('mongoose');
const Post = require('./db/post');

const { DATABASE_URL } = process.env;

const connectToDatabase = async () => {

    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    };

    return mongoose.connect(DATABASE_URL, options);
};

exports.handler = async function (event, context) {
    const send = data => {
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type,Accept"
            },
            body: JSON.stringify(data)
        }
    };

    const sendError = (message) => {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: message })
        }
    };

    const getPost = async () => {
        try {
            await connectToDatabase();
        } catch (ex) {
            console.error(ex);
            return sendError("Unable connect to database");
        }

        try {
            const data = await Post.find();
            return send(data);
        }
        catch (ex) {
            console.error(ex);
            sendError("Unable to fetch data from database");
        }

        mongoose.connection.close();
    };

    if (event.httpMethod === 'GET') {
        return getPost();
    }
    else {
        return sendError(`Request methdo ${event.httpMethod} not supported!`)
    }
}
