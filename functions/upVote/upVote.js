const vote = require('../util/vote');
const { error } = require('../util/result');

const upVote = async (postId, voteCount) => {
    return vote(postId, 'upVotes', voteCount);
};

exports.handler = async function (event) {
    if (event.httpMethod === 'POST') {
        const body = JSON.parse(event.body);
        const { postId, count } = body;
        return upVote(postId, count);
    }
    else {
        return error(`Request methdo ${event.httpMethod} not supported!`)
    }
}
