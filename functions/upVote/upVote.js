const Post = require('../util/model/post');
const { connect, close } = require('../util/database');
const { send, error } = require('../util/result');

const upVote = async (postId, voteCount) => {
    try {
        await connect();
    } catch (ex) {
        console.error(ex);
        return error("Unable connect to database");
    }

    try {
        const post = await Post.findById(postId);

        if (!post) return error("Post not found");

        post.upVotes = voteCount;

        post.save();

        return send(post);
    }
    catch (ex) {
        console.error(ex);
        error("Unable to fetch data from database");
    }

    close();
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
