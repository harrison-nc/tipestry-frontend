import React, { useState } from 'react';
import { Email, Password } from '../components/Input';
import { Header } from './login/Header';
import { useInputs } from "./login/hooks/useInputs";
import { Control } from "./login/Control";
import { ErrorMessage } from "./login/ErrorMessage";
import { useNavigator } from '../hooks/useNavigator';

export default function Login({ isModal, onLogin }) {
    const Inputs = useInputs();
    const navigator = useNavigator(isModal);
    const [serverError, setServerError] = useState('');

    const showError = (error) => {
        const { key, value, message } = error;
        const input = Inputs[key];

        if (input) input.setError(message);

        else console.error(`Server Error: ${message}`);

        console.debug(`Error: '${key}' - '${value}`);
    };

    const handleClear = (e) => {
        Inputs.asArray().forEach(input => input.reset());
        setServerError('');
    };

    const handleClose = (e) => {
        handleClear(e);
        navigator.goBack();
    }

    const handleResponse = (response) => {
        if (response.errorMessage) setServerError(response.errorMessage);

        else if (response.errors instanceof Array) response.errors.forEach(err => showError(err));

        else if (response instanceof Error) setServerError('Unable to login at this moment.');

        else if (response instanceof Object) showError(response);

        console.debug(response);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = Inputs.validateAll();

        if (!isValid) return;

        Inputs.disableAll();

        try {
            const result = await onLogin({
                email: Inputs.email.getValue(),
                password: Inputs.password.getValue(),
            });

            if (result) handleResponse(result);

            else navigator.goBack();

        } catch (ex) {
            handleResponse(ex);
        }

        Inputs.enableAll();
    }

    return (
        <div className="login is-flex">
            <form
                className="login__content is-flex flex-column has-background-white box py-4 px-3" >
                <Header onClose={handleClose} />
                <Email {...Inputs.email.props} />
                <Password {...Inputs.password.props} />
                {serverError && <ErrorMessage value={serverError} />}
                <Control isModal={isModal} onClear={handleClear} onSubmit={handleSubmit} />
            </form>
        </div>
    );
}
