import { addCommentFunction } from '../startup/startup';

const addComment = (posts, postId, comment, consumer) => {
    const postArray = [...posts];
    const selectedPostArray = postArray.filter(p => p._id === postId);

    if (selectedPostArray.length === 0)
        return;

    const selectedPost = selectedPostArray[0];
    const comments = [...selectedPost.comments];
    comments.push(comment);
    selectedPost.comments = comments;

    const index = postArray.indexOf(selectedPost);
    postArray[index] = selectedPost;

    consumer(postArray);
};

export const updateComment = async (user, posts, postId, comment, consumer) => {
    try {
        const headers = { 'Content-Type': 'application/json' };

        if (user) headers['x-auth-token'] = user['token'];

        const response = await fetch(addCommentFunction, {
            method: 'POST',
            mode: 'cors',
            headers,
            body: JSON.stringify({ text: comment, postId })
        });

        const result = await response.json();
        const status = Number(response.status);

        if (status === 200)
            addComment(posts, postId, result, consumer);

        else
            console.log('response', response);

        return status;
    }
    catch (ex) {
        throw ex;
    }
};
