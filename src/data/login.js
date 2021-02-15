import { loginUserFunction } from '../startup/startup';

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

        const result = await response.json();

        if (result.errors || result.errorMessage)
            return result;

        const { data } = result;

        return data;

    } catch (ex) {
        throw ex;
    }
};
