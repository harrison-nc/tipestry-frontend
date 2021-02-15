import { registerUserFunction } from "../startup/startup";

export async function registerUser(Inputs) {
    try {
        const form = new FormData();
        form.append('name', Inputs.name.getValue());
        form.append('email', Inputs.email.getValue());
        form.append('password', Inputs.password.getValue());

        const encoded = new URLSearchParams(form).toString();

        const response = await fetch(registerUserFunction, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
            },
            body: encoded
        });

        const result = await response.json();

        if (result.errors || result.errorMessage) {
            return result;
        }
    }
    catch (ex) {
        console.debug(ex);
    }
}