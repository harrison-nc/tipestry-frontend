const { Post, PostError } = require('../util/model/post');
const { withConnection } = require('../util/database');
const Response = require('../util/response');
const { verify: verifyToken, TokenError, UnauthorizedError } = require('../util/verifyToken');

exports.handler = async function (event) {
    if (event.httpMethod !== 'POST') {
        return Response.ofError(`Request method ${event.httpMethod} not supported`);
    }

    const bodyURLParams = new URLSearchParams(event.body);
    const body = Object.fromEntries(bodyURLParams);

    try {
        const token = event.headers['x-auth-token'];
        const result = await withUser(token, (user) => {
            return withConnection(() => {
                const tags = parseTags(body.tags);
                const { resourceUrl, title, description } = body;
                const post = { title, resourceUrl, description, tags };
                return Post.newPost(post, user);
            });
        });

        return Response.of(result);

    } catch (error) {
        if (error instanceof PostError) {
            return Response.ofError(error.data);
        }
        else if (error instanceof TokenError) {
            return Response.ofError(error.message);
        }
        else if (error instanceof UnauthorizedError) {
            return Response.ofError("Please provide a valid token", { status: 401 });
        }
        else {
            console.debug(error);
            return Response.ofError('Failed create post', { status: 500 });
        }
    }
}

const withUser = (token, callback) => {
    try {
        let user = verifyToken(token);
        return callback(user);
    }
    catch (error) {
        console.debug(error);
        throw new TokenError('Invalid token');
    }
};

const parseTags = (tags) => {
    tags = tags || [];

    if (typeof tags === 'string') {
        tags = tags.split(',');
    }

    return tags;
}
