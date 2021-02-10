import React, { useState } from 'react';
import { Email, Password } from '../components/Input';
import { Header } from '../components/login/Header';
import { useInputs } from "../components/login/hooks/useInputs";
import { Control } from "../components/login/Control";
import { ErrorMessage } from "../components/login/ErrorMessage";
import { useBackgroundNavigator } from '../hooks/useBackgroundNavigator';

export default function Login({ isModal, onLogin }) {
    const Inputs = useInputs();
    const navigator = useBackgroundNavigator(isModal);
    const [serverError, setServerError] = useState('');

    const showError = (error) => {
        const { key, value, message } = error;
        const input = Inputs[key];

        if (input) input.setError(message);

        else console.error(`Server Error: ${message}`);

        console.log(`Error: '${key}' - '${value}`);
    };

    const handleClear = (e) => {
        Inputs.asArray().forEach(input => input.reset());
        setServerError('');
    };

    const handleClose = (e) => {
        handleClear(e);
        navigator.goBack();
    }

    const handleSubmitFailure = (error) => {
        const { login } = error;

        if (login) setServerError(login.message);

        else if (error instanceof Error) setServerError('Unable to login at this moment.');

        else if (error instanceof Array) error.forEach(err => showError(err));

        else if (error instanceof Object) showError(error);

        console.error(error);
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

            if (result && !result.succeeded) handleSubmitFailure(result.errors);

        } catch (ex) {
            handleSubmitFailure(ex);
        }

        Inputs.enableAll();
    }

    return (
        <div className="login is-flex">
            <div className="login__content is-flex flex-column has-background-white box py-4 px-3" >
                <Header onClose={handleClose} />
                <Email {...Inputs.email.props} />
                <Password {...Inputs.password.props} />
                {serverError && <ErrorMessage value={serverError} />}
                <Control isModal={isModal} onClear={handleClear} onSubmit={handleSubmit} />
            </div >
        </div>
    );
}
