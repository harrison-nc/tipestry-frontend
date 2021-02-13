import React from 'react';
import { Email, Password, ConfirmPassword, Name } from '../components/Input';
import { useNavigator } from '../hooks/useNavigator';
import { useInputs } from "./register/hooks/useInputs";
import { Control } from "./register/Control";
import { Header } from "./register/Header";
import { registerUser } from '../util/register';

export const registerFunction = process.env.REACT_APP_REGISTER_USER_API;

export default function Register({ isModal }) {
    const Inputs = useInputs();
    const navigator = useNavigator(isModal);

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

    const handleResponse = (response) => {
        if (response.errors instanceof Array) response.forEach(err => showError(err));
        else if (response instanceof Object) showError(response);
        else console.debug(response);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = Inputs.validateAll();

        if (!isValid) return;

        Inputs.disableAll();

        const result = await registerUser(Inputs);

        if (result && (result.errors || result.errorMessage)) {
            handleResponse(result);
        }

        Inputs.enableAll();
    };

    return (
        <div className="register is-flex">
            <form className="is-flex flex-column register__content has-background-white box py-4 px-3" >
                <Header onClose={handleClose} />
                <Name {...Inputs.name.props} />
                <Email {...Inputs.email.props} />
                <Password {...Inputs.password.props} />
                <ConfirmPassword {...Inputs.cpassword.props} />
                <Control isModal={isModal} onClear={handleClear} onSubmit={handleSubmit} />
            </form>
        </div >
    );
};
