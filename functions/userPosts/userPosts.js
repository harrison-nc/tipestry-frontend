const User = require('../util/model/user');
const { Post } = require('../util/model/post');
const { httpMethodNotSupported } = require('../util/error');
const { TokenError, UnauthorizedError } = require('../util/verifyToken');
const { withConnection } = require('../util/database');
const Response = require('../util/response');

module.exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return Response.ofError(httpMethodNotSupported);
    }

    try {
        const body = JSON.parse(event.body);
        if (!body.userId) return Response.ofError('User id is required');

        const posts = await withConnection(() => findPost(body.userId));

        console.debug('# posts...', posts);

        return Response.of(posts);

    } catch (error) {
        if (error instanceof TokenError) {
            return Response.ofError('Invalid token');
        }
        else if (error instanceof UnauthorizedError) {
            return Response.ofError('User not sign in', { status: 401 });
        }
        else {
            console.debug(error);
            return Response.ofError('Failed to get user posts', { status: 500 });
        }
    }
};

const findPost = (userId) => {
    console.debug('# userId', userId);
    // todo: sort by date created and return the last 10 posts
    return Post.find({ "user._id": userId }).limit(10);
};
