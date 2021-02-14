export const postVotes = async (event, upCallback, downCallback) => {
    const { name, value, postId } = event.target;

    switch (name.toLowerCase()) {
        case 'like':
            return upCallback(postId, value);

        case 'dislike':
            return downCallback(postId, value);

        default:
            throw new Error(`invalid action: ${name}, ${value}`);
    }
};

export const updateVotes = async (user, posts, postId, votes, endPoint) => {
    const selectedPost = posts.filter(p => p._id === postId);

    if (!selectedPost || selectedPost.length === 0) {
        throw new Error('selected post not found')
    }

    try {
        const headers = { 'Content-Type': 'application/json' };

        if (user) headers['x-auth-token'] = user['token'];

        const response = await fetch(endPoint, {
            method: 'POST',
            mode: 'cors',
            headers,
            body: JSON.stringify({ count: votes, postId }),
        });

        return response.json();
    }
    catch (ex) {
        throw ex;
    }
};
