const { Post } = require('../util/model/post');
const { validator: validate } = require('../util/model/comment');
const { connect, close } = require('../util/database');
const { parseJoiError } = require('../util/error');
const Response = require('../util/response');
const verifyToken = require('../util/verifyToken');

const addComment = async (postId, comment) => {
    try {
        await connect();
    }
    catch (ex) {
        throw new Error('Unable to connect to database');
    }

    const { error } = validate(comment);

    if (error) return new Error(parseJoiError(error));

    const post = await Post.findById(postId);

    if (!post) return new Error('Post not found');

    return post.addComment(comment);
};

exports.handler = async function (event) {
    if (event.httpMethod !== 'POST') {
        return Response.ofError(`Request method ${event.httpMethod} not supported`);
    }

    let user;

    try {
        user = verifyToken(event.headers['x-auth-token']);
    }
    catch (ex) {
        return Response.ofError(ex);
    }

    const body = JSON.parse(event.body);
    const { postId, text } = body;
    const { name, email } = user;

    const comment = {
        postId,
        text,
        user: { name, email }
    };

    const result = await addComment(postId, comment);

    close();

    return Response.of(result);
}
