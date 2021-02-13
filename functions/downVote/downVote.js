const vote = require('../util/vote');
const Response = require('../util/response');

const downVote = async (postId, voteCount) => {
    return vote(postId, 'downVotes', voteCount);
};

exports.handler = async function (event) {
    if (event.httpMethod !== 'POST') {
        return Response.ofError(`Request method ${event.httpMethod} not supported!`)
    }

    const body = JSON.parse(event.body);
    const { postId, count } = body;
    const result = downVote(postId, count);
    return Response.ofAny(result);
}
