import React, { useState } from 'react';
import { Email, Password, ConfirmPassword, Name } from '../../components/Input';
import { useNavigator } from '../../hooks/useNavigator';
import { useRegisterInputs } from "../../hooks/useRegisterInputs";
import { Control } from "./Control";
import { Header } from "./Header";
import { registerUser } from '../../data/user';

export default function Register({ isModal }) {
    const Inputs = useRegisterInputs();
    const navigator = useNavigator(isModal);
    const [errorMessage, setErrorMessage] = useState('');
    const [isSending, setIsSending] = useState('');

    const showError = (error) => {
        const { key, value, message } = error;
        const input = Inputs[key];
        if (input) input.setError(message);
        else console.error(`Server Error: ${message}`);
        console.debug(`Error: '${key}' - '${value}`);
    };

    const handleClear = (e) => {
        Inputs.asArray().forEach(input => input.reset());
    };

    const handleClose = (e) => {
        handleClear(e);
        navigator.goBack();
    };

    const handleResponse = (response) => {
        if (response.errors instanceof Array) response.errors.forEach(err => showError(err));
        else if (response.errorMessage) setErrorMessage(response.errorMessage);
        else showError(response);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = Inputs.validateAll();

        if (!isValid) return;

        setIsSending(true);
        Inputs.disableAll();

        const result = await registerUser(Inputs);

        if (result) {
            handleResponse(result);
        } else {
            navigator.goBack();
        }

        setIsSending(false);
        Inputs.enableAll();
    };

    return (
        <div className="register is-flex">
            <form
                onSubmit={handleSubmit}
                className="is-flex flex-column register__content has-background-white box py-4 px-3" >
                <Header onClose={handleClose} />
                <Name {...Inputs.name.props} autoComplete="username" />
                <Email {...Inputs.email.props} autoComplete="email" />
                <Password {...Inputs.password.props} autoComplete="new-password" />
                <ConfirmPassword {...Inputs.cpassword.props} autoComplete="new-password" />
                {errorMessage && <span className="error">{errorMessage}</span>}
                <Control isSending={isSending} onClear={handleClear} />
            </form>
        </div >
    );
};
