const { Post } = require('../util/model/post');
const { withConnection } = require('../util/database');
const Response = require('../util/response');

exports.handler = async function (event) {
    if (event.httpMethod !== 'GET') {
        return Response.ofError(`Request method ${event.httpMethod} not supported!`);
    }

    const queryParams = event.queryStringParameters;

    if (Object.values(queryParams).length > 0 && queryParams.q) {
        const query = queryParams.q;
        const result = await withConnection(() => findPosts(query));
        return Response.of(result);
    } else {
        const result = await withConnection(() => getPost());
        return Response.of(result);
    }
}

const findPostMatchingQuery = (query) => {
    const regex = new RegExp(query, 'i');
    const filter = { title: { $regex: regex } };
    return Post.find(filter).limit(10);
}

const findPosts = async (query) => {
    if (!query || query.trim() === '') return [];

    try {
        const terms = query.split(' ');
        const postPromises = Promise.all(terms.map(term => findPostMatchingQuery(term)));
        const matchingPosts = await postPromises;
        const flattenArray = matchingPosts.flat(100);
        const sortedPosts = flattenArray.sort((a, b) => b.views - a.views);

        if (sortedPosts.length < 10) return sortedPosts;

        const limit10 = sortedPosts.slice(0, 11);

        return limit10;

    } catch (ex) {
        console.debug(ex);
        throw new Error("Unable to retrieve data from database");
    }
};

const getPost = () => {
    try {
        return Post.find();
    } catch (ex) {
        throw new Error("Unable to fetch data from database");
    }
};
