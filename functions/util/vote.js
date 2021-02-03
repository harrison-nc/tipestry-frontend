const Post = require('../util/model/post');
const { connect, close } = require('../util/database');
const { send, error } = require('../util/result');

module.exports = async (postId, voteType, voteCount) => {
    try {
        await connect();
    } catch (ex) {
        close();
        console.error(ex);
        return error("Unable connect to database");
    }

    const type = voteType && voteType.toLowerCase();

    if (!type || !(type === 'upvotes' || type === 'downvotes')) {
        close();
        console.debug('vote type is invalid =>', voteType);
        return error("Invalid vote type: " + voteType);
    }

    try {
        const post = await Post.findById(postId);

        if (!post) return error("Post not found");

        post[voteType] = voteCount;

        await post.save();

        close();
        return send(post);
    }
    catch (ex) {
        close();
        console.error(ex);
        return error("Unable to fetch data from database");
    }
};
