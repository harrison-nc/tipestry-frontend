const User = require('../util/model/user');
const { Post } = require('../util/model/post');
const { httpMethodNotSupported } = require('../util/error');
const { TokenError, UnauthorizedError } = require('../util/verifyToken');
const { withConnection } = require('../util/database');
const Response = require('../util/response');

module.exports.handler = async (event) => {
    try {
        if (event.httpMethod !== 'POST') {
            return Response.ofError(httpMethodNotSupported);
        }

        const body = JSON.parse(event.body);

        if (!body.userId) {
            return Response.ofError('User id is required');
        }

        const posts = await withConnection(() => findPost(body.userId));
        return Response.of(posts);

    } catch (error) {
        if (error instanceof TokenError) {
            return Response.ofError('Invalid token');
        }
        else if (error instanceof UserNotFound) {
            return Response.ofError('User not found');
        }
        else if (error instanceof UnauthorizedError) {
            return Response.ofError('User not sign in', { status: 401 });
        }
        else {
            console.debug(error);
            return Response.ofError('Failed to get user comments', { status: 500 });
        }
    }
};

const findPost = async (userId) => {
    // todo: sort by date created and return the last 10 posts
    const user = await User.findById(userId);

    if (!user) {
        throw new UserNotFound('User not found');
    }

    const result = await Post.aggregate([
        { $unwind: "$comments" },
        { $match: { "comments.user.email": `${user.email}` } },
        { $project: { value: "$comments" } }
    ]);

    return result;
};

class UserNotFound extends Error { }
