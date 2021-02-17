import { registerUserFunction, loginUserFunction } from "../startup/startup";

export async function registerUser({ name, email, password }) {
    try {
        const form = new FormData();
        form.append('name', name);
        form.append('email', email);
        form.append('password', password);

        const encoded = new URLSearchParams(form).toString();

        const response = await fetch(registerUserFunction, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
            },
            body: encoded
        });

        return response.json();
    }
    catch (ex) {
        console.debug(ex);
    }
}

export const loginUser = async (user) => {
    try {
        const response = await fetch(loginUserFunction, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(user)
        });

        return response.json();

    } catch (ex) {
        throw ex;
    }
};
