const Post = require('../util/model/post');
const { connect, close } = require('../util/database');
const { send, error: sendError } = require('../util/result');

const findPostMatchingQuery = async (query) => {
    const regex = new RegExp(query, 'i');
    const post = await Post.find({ title: { $regex: regex } });
    return post;
}

const findPosts = async (query) => {
    if (!query && query.trim() === '') return send([]);

    try {
        await connect();
    } catch (ex) {
        console.error(ex);
        return sendError("Unable connect to database");
    }

    try {
        const terms = query.split(' ');
        const postPromises = Promise.all(terms.map(term => findPostMatchingQuery(term)));
        const matchingPosts = await postPromises;
        const flattenArray = matchingPosts.flat(100);
        const sortedPosts = flattenArray.sort((a, b) => b.views - a.views);

        if (sortedPosts.length < 10) return send(sortedPosts);

        const limit10 = sortedPosts.slice(0, 11);

        return send(limit10);
    }
    catch (ex) {
        console.error(ex);
        return sendError("Unable to retrieve data from database");
    }
};

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
        return sendError("Unable to fetch data from database");
    }
};

exports.handler = async function (event) {
    if (event.httpMethod === 'GET') {

        const queryParams = event.queryStringParameters;

        if (Object.values(queryParams).length !== 0 && queryParams.q) {
            const query = queryParams.q;

            const result = await findPosts(query);

            close();

            return result;
        }
        else {
            const result = await getPost();

            close();

            return result;
        }
    }
    else {
        close();
        return sendError(`Request method ${event.httpMethod} not supported!`)
    }
}
