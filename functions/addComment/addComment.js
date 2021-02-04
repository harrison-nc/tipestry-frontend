const Post = require('../util/model/post');
const { validator: validate } = require('../util/model/comment');
const { connect, close } = require('../util/database');
const { send, error } = require('../util/result');
const { parseJoiError } = require('../util/error');

const addComment = async (postId, comment) => {
    try {
        await connect();
    }
    catch (ex) {
        console.debug(ex);
        return error('Unable to connect to database');
    }

    const { error: validationError } = validate(comment);

    if (validationError) {
        console.debug(validationError);
        return error(parseJoiError(validationError));
    }

    const post = await Post.findById(postId);

    if (!post) return error('Post not found');

    await post.addComment(comment);

    return send({ post });
};

exports.handler = async function (event) {
    if (event.httpMethod === 'POST') {
        const body = JSON.parse(event.body);
        const { postId, text } = body;

        const comment = {
            postId,
            text,
            // todo: add valid user
        };

        const result = await addComment(postId, comment);

        close();

        return result;
    }
    else {
        close();
        return error(`Request method ${event.httpMethod} not supported`);
    }
}
