import { addCommentFunction } from '../startup/startup';

const addComment = (posts, postId, comment) => {
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

    return postArray;
};

export const updateComment = async (user, posts, postId, comment) => {
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

        if (Number(response.status) === 200) {
            return addComment(posts, postId, result.data);
        }

        return result;
    }
    catch (ex) {
        throw ex;
    }
};
