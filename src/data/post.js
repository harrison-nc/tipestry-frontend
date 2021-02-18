import { addCommentFunction, addPostFunction, uploadFunction } from "../startup/startup";

export const defaultTags = [
    "programing", "java", "html",
    "coding", "marketing", "cat",
    "dog", "mouse", "football",
    "css", "javascript",
];

export const createPost = async (user, data) => {
    try {
        const encodedString = new URLSearchParams(data).toString();

        const response = await fetch(addPostFunction, {
            method: 'POST',
            mode: 'cors',
            headers: getRequestHeaders(user),
            body: encodedString,
        });

        if (!response.ok) {
            let data = await response.json();
            throw new RequestError('Failed create post.', data);
        }

        return response.json();

    } catch (error) {
        throw error;
    }
};

export const addComment = async (user, postId, comment) => {
    try {
        const response = await fetch(addCommentFunction, {
            method: 'POST',
            mode: 'cors',
            headers: getRequestHeaders(user),
            body: JSON.stringify({ text: comment, postId })
        });

        return response.json();
    }
    catch (ex) {
        throw ex;
    }
};

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

export const addVotes = async (user, post, votes, endPoint) => {
    if (!post || !post._id) {
        console.debug('# post', post);
        throw new Error('Invalid post');
    }

    try {
        const response = await fetch(endPoint, {
            method: 'POST',
            mode: 'cors',
            headers: getRequestHeaders(user),
            body: JSON.stringify({ count: votes, postId: post._id }),
        });

        return response.json();
    }
    catch (ex) {
        throw ex;
    }
};

export async function uploadImage(file) {
    const data = await getImageData(file);
    const form = new FormData();
    form.append('image', data);
    form.append('name', file.name);
    const encodedData = new URLSearchParams(form).toString();

    const response = await fetch(uploadFunction, {
        method: 'POST',
        headers: getRequestHeaders(),
        body: encodedData
    });

    if (!response.ok) throw new Error('File upload failed');

    return response.json();
};

const getImageData = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = (event) => resolve(reader.result);
        reader.onerror = (event) => reject(reader.result);
        reader.readAsDataURL(file);
    });
};

const getRequestHeaders = (user) => {
    const headers = {
        'Accept': 'application/json',
        'Content-Type': "application/x-www-form-urlencoded"
    };

    if (user && user.token) headers['x-auth-token'] = user['token'];

    return headers;
};

export class RequestError extends Error {
    constructor(message, data) {
        super(message);
        this.data = data;
    }
}
