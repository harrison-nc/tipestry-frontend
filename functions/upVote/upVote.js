const vote = require('../util/vote');
const Response = require('../util/response');

const upVote = async (postId, voteCount) => {
    return vote(postId, 'upVotes', voteCount);
};

exports.handler = async function (event) {
    if (event.httpMethod !== 'POST') {
        return Response.ofError(`Request method ${event.httpMethod} not supported!`);
    }

    const body = JSON.parse(event.body);
    const { postId, count } = body;
    const result = await upVote(postId, count);
    return Response.ofAny(result);
}
