import { addCommentFunction } from '../startup/startup';

export const updateComment = async (user, postId, comment) => {
    try {
        const headers = { 'Content-Type': 'application/json' };

        if (user) headers['x-auth-token'] = user['token'];

        const response = await fetch(addCommentFunction, {
            method: 'POST',
            mode: 'cors',
            headers,
            body: JSON.stringify({ text: comment, postId })
        });

        return response.json();
    }
    catch (ex) {
        throw ex;
    }
};
