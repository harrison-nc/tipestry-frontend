import React, { useState } from 'react';
import { Header } from './Header';
import { Control } from "./Control";
import { useNavigator } from '../../hooks/useNavigator';
import { Email, Password } from '../../components/Input';
import { useLoginInputs } from "../../hooks/useLoginInputs";

export default function Login({ isModal, onLogin }) {
    const Inputs = useLoginInputs();
    const navigator = useNavigator(isModal);
    const [errorMessage, setErrorMessage] = useState('');
    const [isSending, setIsSending] = useState(false);

    const showError = (error) => {
        const { key, value, message } = error;
        const input = Inputs[key];

        if (input) input.setError(message);

        else console.error(`Server Error: ${message}`);

        console.debug(`Error: '${key}' - '${value}`);
    };

    const handleClear = (e) => {
        Inputs.asArray().forEach(input => input.reset());
        setErrorMessage('');
    };

    const handleClose = (e) => {
        handleClear(e);
        navigator.goBack();
    }

    const handleResponse = (response) => {
        if (response.errorMessage) setErrorMessage(response.errorMessage);

        else if (response.errors instanceof Array) response.errors.forEach(err => showError(err));

        else if (response instanceof Error) setErrorMessage('Unable to login at this moment.');

        else if (response instanceof Object) showError(response);

        console.debug(response);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = Inputs.validateAll();

        if (!isValid) return;

        setIsSending(true);
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

        setIsSending(false);
        Inputs.enableAll();
    }

    return (
        <div className="login is-flex">
            <form
                className="login__content is-flex flex-column has-background-white box py-4 px-3"
                method="post"
                onSubmit={handleSubmit}>
                <Header onClose={handleClose} />
                <Email {...Inputs.email.props} autoComplete="email" />
                <Password {...Inputs.password.props} autoComplete="current-password" />
                {errorMessage && <span className="error">{errorMessage}</span>}
                <Control isSending={isSending} isModal={isModal} onClear={handleClear} />
            </form>
        </div>
    );
}
