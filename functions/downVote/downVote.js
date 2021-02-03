const vote = require('../util/vote');
const { error } = require('../util/result');

const downVote = async (postId, voteCount) => {
    return vote(postId, 'downVotes', voteCount);
};

exports.handler = async function (event) {
    if (event.httpMethod === 'POST') {
        const body = JSON.parse(event.body);
        const { postId, count } = body;
        return downVote(postId, count);
    }
    else {
        return error(`Request method ${event.httpMethod} not supported!`)
    }
}
