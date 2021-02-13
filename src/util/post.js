import { addPostFunction } from '../startup/startup';

export const createPost = async (user, posts, data) => {
    try {
        const encodedString = new URLSearchParams(data).toString();

        const response = await fetch(addPostFunction, {
            method: 'POST',
            mode: 'cors',
            headers: getPostHeaders(user),
            body: encodedString,
        });

        const result = await response.json();

        if (!response.ok) return result;

        const update = [...posts];
        update.push(result.data);
        return update;

    } catch (ex) {
        console.error(ex);
        throw ex;
    }
};

const getPostHeaders = (user) => {
    const headers = {
        Accept: 'application/json',
        'Content-Type': "application/x-www-form-urlencoded"
    };

    if (user) headers['x-auth-token'] = user['token'];

    return headers;
};
