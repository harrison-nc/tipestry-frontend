const { Post, validate } = require('../util/model/post');
const { connect, close } = require('../util/database');
const Response = require('../util/response');
const { parseJoiError } = require('../util/error');
const verifyToken = require('../util/verifyToken');

const addPost = async (post, user) => {
    const { error } = validate(post);

    if (error) return new Error(parseJoiError(error));

    try {
        await connect();
    }
    catch (ex) {
        throw new Error('Unable to connect to database');
    }

    return Post.newPost(post, user);
};

exports.handler = async function (event) {
    if (event.httpMethod !== 'POST') {
        return Response.ofError(`Request method ${event.httpMethod} not supported`);
    }

    const bodyURLParams = new URLSearchParams(event.body);
    const body = Object.fromEntries(bodyURLParams);

    if (body.tags) body.tags = body.tags.split(',');
    else body.tags = []


    let user;

    try {
        user = verifyToken(event.headers['x-auth-token']);
    }
    catch (ex) {
        return Response.ofError(ex);
    }

    const result = await addPost(body, user);

    close();

    return Response.ofAny(result);
}
