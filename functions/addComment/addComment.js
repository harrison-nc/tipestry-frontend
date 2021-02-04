const Post = require('../util/model/post');
const { validator: validate } = require('../util/model/comment');
const { connect, close } = require('../util/database');
const { parseJoiError } = require('../util/error');
const Response = require('../util/response');

const addComment = async (postId, comment) => {
    try {
        await connect();
    }
    catch (ex) {
        console.debug(ex);
        return new Error('Unable to connect to database');
    }

    const { error } = validate(comment);

    if (error) return new Error(parseJoiError(error));

    const post = await Post.findById(postId);

    if (!post) return new Error('Post not found');

    await post.addComment(comment);

    return post;
};

exports.handler = async function (event) {
    if (event.httpMethod !== 'POST') {
        return Response.of(new Error(`Request method ${event.httpMethod} not supported`));
    }

    const body = JSON.parse(event.body);
    const { postId, text } = body;

    const comment = {
        postId,
        text,
        // todo: add valid user
    };

    const result = await addComment(postId, comment);

    close();

    return Response.of(result);
}
