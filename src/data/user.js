import { registerUserFunction, loginUserFunction, userPostFunction, userCommentFunction } from "../startup/startup";

export async function registerUser(data) {
    const encoded = new URLSearchParams(data).toString();

    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
    };

    const response = await fetch(registerUserFunction, {
        method: 'POST',
        headers,
        body: encoded
    });

    if (!response.ok) {
        const data = await response.json();
        throw new RegisterError('Registration failed', data);
    }

    return response.json();
}

export const loginUser = async (user) => {
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };

    const response = await fetch(loginUserFunction, {
        method: 'POST',
        headers,
        body: JSON.stringify(user)
    });

    if (!response.ok) {
        const data = await response.json();
        throw new LoginError('Login failed', data);
    }

    return response.json();
};

export const getPosts = async (userId) => {
    return getUserContent(userPostFunction, userId);
};

export const getComments = async (userId) => {
    return getUserContent(userCommentFunction, userId);
};

export const getUserContent = async (endPoint, userId) => {
    if (!userId) throw new Error('userId is required');
    if (!endPoint) throw new Error('API endpoint is required');

    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    };

    const response = await fetch(endPoint, {
        method: 'POST',
        headers,
        body: JSON.stringify({ userId })
    })

    if (!response.ok) {
        throw new PostError('Failed to get user posts');
    }

    return response.json();
};

export class LoginError extends Error {
    constructor(message, data) {
        super(message);
        this.data = data;
    }
}

export class RegisterError extends Error {
    constructor(message, data) {
        super(message);
        this.data = data;
    }
}

export class PostError extends Error { }
