const { Post } = require('../util/model/post');
const { connect, close } = require('../util/database');

module.exports = async (postId, voteType, voteCount) => {
    try {
        await connect();
    } catch (ex) {
        close();
        console.error(ex);
        return new Error("Unable connect to database");
    }

    const type = voteType && voteType.toLowerCase();

    if (!type || !(type === 'upvotes' || type === 'downvotes')) {
        close();
        console.debug('vote type is invalid =>', voteType);
        return new Error("Invalid vote type: " + voteType);
    }

    try {
        const post = await Post.findById(postId);

        if (!post) return new Error("Post not found");

        post[voteType] = voteCount;

        await post.save();

        close();
        return post;
    }
    catch (ex) {
        close();
        console.error(ex);
        return new Error("Unable to fetch data from database");
    }
};
