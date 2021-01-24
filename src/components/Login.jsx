import '../css/modal.css';
import React, { useState } from 'react';
import { Email, Password } from './Input';
import { validateEmail } from '../util/validators';
import { FormModal, createModal } from './modal/Modal';
import { useFormInput } from './hooks/InputHooks';

const Login = (props) => {
    const { id, onLogin } = props;
    const Inputs = useInputs();
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
        window.location.hash = '#app';
    }

    const handleSubmitFailure = (error) => {
        const { login } = error;

        if (login) setServerError(login.message);

        else if (error instanceof Error) setServerError('Unable to login at this moment.');

        else if (error instanceof Array) error.forEach(err => showError(err));

        else if (error instanceof Object) showError(error);

        else window.location.href = '#lfailure';

        console.error(error);
    };

    const handleSubmitSuccess = () => {
        handleClear();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = Inputs.validateAll();

        if (!isValid) return;

        try {
            const { error } = await onLogin({
                email: Inputs.email.getValue(),
                password: Inputs.password.getValue(),
            });

            if (error) handleSubmitFailure(error);
            else handleSubmitSuccess();

        } catch (ex) {
            handleSubmitFailure(ex);
            console.error(ex);
        }
    }

    const closeButton = <input className="close modal-close btn" type="reset" value="X" />

    const form = {
        id,
        title: "Sign in",
        method: "post",
        close: closeButton,
        onReset: handleClose,
        onSubmit: handleSubmit,
    };

    return (
        <div className="login">
            <FormModal {...form}>
                <Email id="l-email" {...Inputs.email.props} />
                <Password id="l-password" {...Inputs.password.props} />

                {serverError && <span className="error">{serverError}</span>}

                <Control onClear={handleClear} />
            </FormModal>
            <Failure />
        </div >
    );
}

const useInputs = () => {
    const email = useFormInput('', value => {
        const validator = validateEmail;

        if (!value) return 'Please enter an email.';
        else if (!validator(value)) return 'Please enter a valid email.';
        else return '';
    });

    const password = useFormInput('', value => {
        if (!value) return 'Please enter a password.';
        else return '';
    });

    return Object.freeze({
        email,
        password,

        asArray() {
            return [this.email, this.password];
        },

        validateAll() {
            const validate = input => input.validate() === '';
            const isValid = (a, b) => a && b;
            return this.asArray().map(validate).reduce(isValid, true);
        }
    });
};

const Failure = createModal({
    id: "lfailure",
    type: "failure",
    text: "Login failed",
});

const Control = (props) => {
    const { onClear } = props;

    return (
        <div className="control buttons is-flex mt-3">
            <input className="close modal-close btn" type="button" value="clear" onClick={onClear} />
            <input className="btn py-4 px-3 is-primary has-color-white" type="submit" value="Login" />
        </div>
    );
};

export default Login;
