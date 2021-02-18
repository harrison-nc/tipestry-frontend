import { registerUserFunction, loginUserFunction } from "../startup/startup";

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
