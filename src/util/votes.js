export const postVotes = async (event, user, upCallback, downCallback) => {
    const headers = { 'Content-Type': 'application/json' };

    if (user) headers['x-auth-token'] = user['token'];

    const { name, value, postId } = event.target;

    switch (name.toLowerCase()) {
        case 'like':
            await upCallback(postId, value, headers);
            break;

        case 'dislike':
            await downCallback(postId, value, headers);
            break;

        default:
            console.error('invalid action', name, value);
            break;
    }
};

export const updateVotes = async (posts, postId, name, votes, headers, endPoint, consumer) => {
    const selectedPost = posts.filter(p => p._id === postId);

    if (!selectedPost || selectedPost.length === 0) {
        console.log('error post not found');
        return false;
    }

    const post = selectedPost[0];
    const index = posts.indexOf(post);

    try {
        const response = await fetch(endPoint, {
            method: 'POST',
            mode: 'cors',
            headers,
            body: JSON.stringify({ count: votes, postId }),
        });

        if (Number(response.status) !== 200) {
            console.error(await response.text(), response);
            return false;
        }

        post[name] = votes;
        posts[index] = post;

        consumer([...posts]);
        return votes;
    }
    catch (ex) {
        throw ex;
    }
};
