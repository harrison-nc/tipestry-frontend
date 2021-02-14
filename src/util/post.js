import { addPostFunction } from '../startup/startup';

export const createPost = async (user, data) => {
    try {
        const encodedString = new URLSearchParams(data).toString();

        const response = await fetch(addPostFunction, {
            method: 'POST',
            mode: 'cors',
            headers: getPostHeaders(user),
            body: encodedString,
        });

        return response.json();

    } catch (ex) {
        console.error(ex);
        return ex;
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
