const Post = require('./model/post');
const { connect, close } = require('../util/database');
const { send, error: sendError } = require('../util/result');

const getPost = async () => {
    try {
        await connect();
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

    close();
};

exports.handler = async function (event, context) {
    if (event.httpMethod === 'GET') {
        return getPost();
    }
    else {
        return sendError(`Request methdo ${event.httpMethod} not supported!`)
    }
}
