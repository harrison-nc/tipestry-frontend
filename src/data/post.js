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

        return response.json();

    } catch (ex) {
        console.error(ex);
        return ex;
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

export const addVotes = async (user, posts, postId, votes, endPoint) => {
    const selectedPost = posts.filter(p => p._id === postId);

    if (!selectedPost || selectedPost.length === 0) {
        throw new Error('selected post not found')
    }

    try {
        const response = await fetch(endPoint, {
            method: 'POST',
            mode: 'cors',
            headers: getRequestHeaders(user),
            body: JSON.stringify({ count: votes, postId }),
        });

        return response.json();
    }
    catch (ex) {
        throw ex;
    }
};

export default async function uploadImage(file) {
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

    if (user) headers['x-auth-token'] = user['token'];

    return headers;
};
