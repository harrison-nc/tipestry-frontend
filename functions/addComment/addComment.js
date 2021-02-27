const { Post, PostError } = require('../util/model/post');
const { validator: validate } = require('../util/model/comment');
const { withConnection } = require('../util/database');
const { parseJoiError } = require('../util/error');
const Response = require('../util/response');
const { verify: verifyToken, TokenError, UnauthorizedError } = require('../util/verifyToken');

exports.handler = async function (event) {
    if (event.httpMethod !== 'POST') {
        return Response.ofError(`Request method ${event.httpMethod} not supported`);
    }

    try {
        const body = JSON.parse(event.body);
        const { postId, text } = body;

        const comment = withToken(event.headers['x-auth-token'], (payload) => {
            const { name, email, _id } = payload;
            const user = { name, email, _id };
            const comment = { postId, text, user };
            return comment;
        });

        const result = await withConnection(() => {
            return addComment(postId, comment);
        });

        return Response.of(result);

    } catch (error) {
        console.debug(error);

        if (error instanceof TokenError || error instanceof UnauthorizedError) {
            return Response.ofError(error.message);
        } else if (error instanceof ValidationError || error instanceof PostError) {
            return Response.ofError(error.message);
        } else {
            return Response.ofError('Internal server error');
        }
    }
}

const addComment = async (postId, comment) => {
    const { text } = comment;
    const { error } = validate({ text, postId });

    if (error) throw new ValidationError(parseJoiError(error));

    const post = await Post.findById(postId);

    if (!post) throw new PostError('Post not found');

    return post.addComment(comment);
};

function withToken(token, callback) {
    try {
        const payload = verifyToken(token);
        return callback(payload);
    }
    catch (error) {
        throw error;
    }
}

function ValidationError(message) {
    this.message = message;
}
