const { Post } = require('../util/model/post');
const { connect, close } = require('../util/database');
const Response = require('../util/response');

const findPostMatchingQuery = async (query) => {
    const regex = new RegExp(query, 'i');
    const post = await Post
        .find({ title: { $regex: regex } })
        .limit(10);
    return post;
}

const findPosts = async (query) => {
    if (!query || query.trim() === '') return [];

    try {
        await connect();
    }
    catch (ex) {
        throw new Error('Unable to connect to database');
    }

    try {
        const terms = query.split(' ');
        const postPromises = Promise.all(terms.map(term => findPostMatchingQuery(term)));
        const matchingPosts = await postPromises;
        const flattenArray = matchingPosts.flat(100);
        const sortedPosts = flattenArray.sort((a, b) => b.views - a.views);

        if (sortedPosts.length < 10) return sortedPosts;

        const limit10 = sortedPosts.slice(0, 11);

        return limit10;
    }
    catch (ex) {
        throw new Error("Unable to retrieve data from database");
    }
};

const getPost = async () => {
    try {
        await connect();
    }
    catch (ex) {
        throw new Error("Unable connect to database");
    }

    try {
        const data = await Post.find();
        return data;
    }
    catch (ex) {
        throw new Error("Unable to fetch data from database");
    }
};

exports.handler = async function (event) {
    if (event.httpMethod !== 'GET') {
        return Response.ofError(`Request method ${event.httpMethod} not supported!`);
    }

    const queryParams = event.queryStringParameters;

    if (Object.values(queryParams).length > 0 && queryParams.q) {
        const query = queryParams.q;

        const result = await findPosts(query);

        close();

        return Response.of(result);
    }
    else {
        const result = await getPost();

        close();

        return Response.of(result);
    }
}
