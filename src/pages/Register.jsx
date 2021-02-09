import React from 'react';
import { Email, Password, ConfirmPassword, Name } from '../components/Input';
import { useBackgroundNavigator } from '../hooks/useBackgroundNavigator';
import { useInputs } from "../components/register/hooks/useInputs";
import { Control } from "../components/register/Control";
import { Header } from "../components/register/Header";

export default function Register({ isModal }) {
    const Inputs = useInputs();
    const navigator = useBackgroundNavigator(isModal);

    const showError = (error) => {
        const { key, value, message } = error;
        const input = Inputs[key];
        if (input) input.setError(message);
        else console.error(`Server Error: ${message}`);
        console.log(`Error: '${key}' - '${value}`);
    };

    const handleClear = (e) => {
        Inputs.asArray().forEach(input => input.reset());
    };

    const handleClose = (e) => {
        handleClear(e);
        navigator.goBack();
    };

    const handleSubmitFailure = (error) => {
        if (error instanceof Array) error.forEach(err => showError(err));
        else if (error instanceof Object) showError(error);

        console.error(error);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = Inputs.validateAll();

        if (!isValid) return;

        Inputs.disableAll();

        Inputs.enableAll();
    };

    return (
        <div className="register is-flex">
            <div className="is-flex flex-column register__content has-background-white box py-4 px-3" >
                <Header onClose={handleClose} />
                <Name {...Inputs.name.props} />
                <Email {...Inputs.email.props} />
                <Password {...Inputs.password.props} />
                <ConfirmPassword {...Inputs.cpassword.props} />
                <Control isModal={isModal} onClear={handleClear} onSubmit={handleSubmit} />
            </div>
        </div >
    );
};
