import { getResponseData } from './response';
import { registerFunction } from '../pages/Register';

export async function registerUser(Inputs, errorHandler) {
    try {
        const form = new FormData();
        form.append('name', Inputs.name.getValue());
        form.append('email', Inputs.email.getValue());
        form.append('password', Inputs.password.getValue());

        const encoded = new URLSearchParams(form).toString();

        const response = await fetch(registerFunction, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
            },
            body: encoded
        });

        await parseResponse(response, errorHandler);
    }
    catch (ex) {
        console.debug(ex);
    }
}
function parseResponse(response, errorHandler) {
    if (!response.ok) {
        const data = getResponseData(response);
        if (data && data.error) {
            errorHandler(data.error);
        }
        else {
            console.debug('# response\n', response);
            throw new Error('Invalid server response');
        }
    }

    return getResponseData(response);
}
