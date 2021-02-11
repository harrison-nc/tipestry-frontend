import { loginUserFunction } from '../startup/startup';

export const loginUser = async (user, consumer) => {
    try {
        const response = await fetch(loginUserFunction, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(user)
        });

        const result = await response.json();

        if (result && result.error)
            return { succeeded: false, errors: result };

        const { login } = result;
        consumer(login);

        return { succeeded: true, data: result };

    } catch (ex) {
        throw ex;
    }
};
