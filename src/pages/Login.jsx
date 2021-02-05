import React, { useState } from 'react';
import { Email, Password } from '../components/Input';
import { validateEmail } from '../util/validators';
import { useFormInput } from '../hooks/InputHooks';
import FancyButton from '../components/FancyButton';
import { useBackgroundNavigator } from '../hooks/useBackgroundNavigator';

const Login = ({ id, isModal, onLogin }) => {
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
    }

    const handleSubmitFailure = (error) => {
        const { login } = error;

        if (login) setServerError(login.message);

        else if (error instanceof ErrorMessage) setServerError('Unable to login at this moment.');

        else if (error instanceof Array) error.forEach(err => showError(err));

        else if (error instanceof Object) showError(error);

        // else window.location.href = '#lfailure';

        console.error(error);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = Inputs.validateAll();

        if (!isValid) return;

        Inputs.disableAll();

        try {
            const { error } = await onLogin({
                email: Inputs.email.getValue(),
                password: Inputs.password.getValue(),
            });

            if (error) handleSubmitFailure(error);

        } catch (ex) {
            handleSubmitFailure(ex);
        }

        Inputs.enableAll();
    }

    return (
        <div className="login is-flex">
            <div id={id} className="login__content is-flex flex-column has-background-white box py-4 px-3" >

                <Header onClose={handleClose} />
                <Email {...Inputs.email.props} />
                <Password {...Inputs.password.props} />

                {serverError && <ErrorMessage value={serverError} />}

                <Control isModal={isModal} onClear={handleClear} onSubmit={handleSubmit} />
            </div >
        </div>
    );
}

const Header = ({ onClose }) => {
    return (
        <div className="header is-flex">
            <p className="title has-text-link">
                Login
            </p>
            <button className="close btn" onClick={onClose}>X</button>
        </div>
    );
};

const ErrorMessage = ({ value }) => {
    return <span className="error">{value}</span>;
};

const Control = ({ isModal, onClear, onSubmit }) => {
    const ref = React.createRef();
    const [isSending, setIsSending] = useState(false);
    const navigator = useBackgroundNavigator(isModal);

    const handleSubmit = async (e) => {
        setIsSending(true);
        await onSubmit(e);
        setIsSending(false);
        navigator.goBack();
    };

    return (
        <div className="login__control is-flex mt-3">
            <input className="cancel btn is-white is-outlined" type="button" value="clear" disabled={isSending} onClick={onClear} />
            <FancyButton className="btn py-4 px-3 is-primary is-bold"
                ref={ref}
                text="Login"
                isSending={isSending}
                onClick={handleSubmit} />
        </div>
    );
};

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
        },

        disableAll() {
            this.asArray().forEach(i => i.disable());
        },

        enableAll() {
            this.asArray().forEach(i => i.enable());
        }
    });
};

export default Login;
