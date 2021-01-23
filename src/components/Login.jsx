import '../css/modal.css';

import React, { useState } from 'react';

import { createValidator, validateEmail } from '../util/validators';

import Input from './Input';
import Modal from './Modal';
import { FormModal } from './Modal';

const Login = (props) => {
    const { id, onLogin } = props;

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [serverError, setServerError] = useState('');

    const Validators = {
        email: {
            ...createValidator(value => {
                if (!value) return 'Please enter an email.';
                else if (!validateEmail(value)) return 'Please enter a valid email.';
                else return '';
            }),
            setValue: setEmail,
            setError: setEmailError,
        },

        password: {
            ...createValidator(value => {
                if (!value) return 'Please enter a password.';
                else return '';
            }),
            setValue: setPassword,
            setError: setPasswordError,
        },

        resetValues() {
            setEmail('');
            setPassword('');
        },

        resetErrors() {
            setEmailError('');
            setPasswordError('');
        }
    };

    const isValid = (name, value) => {
        const input = Validators[name];

        if (input) return input.isValid(value);

        else return false;
    };

    const validateValues = () => {
        return isValid('email', email)
            && isValid('password', password);
    };

    const checkValidity = (name, value) => {
        const input = Validators[name];

        if (!input) return console.log(`'${input}' is not valid`);

        input.validate(value);
    };

    const resetInput = () => Validators.resetValues();

    const resetError = (name) => {
        const input = Validators[name];

        if (input) input.setError('');

        else if (serverError) setServerError('');

        else Validators.resetErrors();
    }

    const showError = (error) => {
        const { key, value, message } = error;
        checkValidity(key, value, message);
    };

    const reportValidity = () => {
        resetError();

        checkValidity('email', email);
        checkValidity('password', password);
    };

    const handleBlur = ({ target }) => checkValidity(target.name, target.value);

    const handleFocus = ({ target }) => resetError(target.name);

    const handleReset = (e) => {
        resetInput();
        resetError();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = validateValues();

        if (isValid) try {
            const { error } = await onLogin({ email, password });

            if (error) {

                const { login } = error;

                if (login) setServerError(login.message);

                else if (error instanceof Array) error.forEach(err => showError(err));

                else if (error instanceof Object) showError(error);

                else window.location.href = '#lfailure';

                console.error(error);
            }

            else resetError() && resetInput();

        } catch (ex) {
            window.location.href = '#lfailure';
            console.error(ex);
        }

        else reportValidity();

        return null;
    }

    const handleChange = ({ target }) => {
        const { name, value } = target;

        const input = Validators[name];

        if (input) input.setValue(value);

        else console.error(`'${name}' invalid input`);
    }

    return (
        <div className="login">
            <FormModal id={id}
                title="Sign in"
                method="post"
                close={<Close />}
                onReset={handleReset}
                onSubmit={handleSubmit}>

                <Input
                    label="Email"
                    type="email"
                    name="email"
                    value={email}
                    hasError={emailError}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    placeholder="Enter email address" />

                <Input
                    label="Password"
                    type="password"
                    name="password"
                    value={password}
                    hasError={passwordError}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    placeholder="Enter password" />

                {serverError && <span className="error">{serverError}</span>}

                <div className="control buttons is-flex mt-3">
                    <input className="btn py-4 px-3 is-primary" type="submit" value="Login" />
                </div>
            </FormModal>

            <Modal id="lfailure" classes="box hax-background-white">
                <div className="failure is-flex flex-column box has-background-white py-3 px-3">
                    <p className="flex-grow is-flex subtitle">
                        Login failed
                    </p>
                    <p className="close-container flex-grow is-flex">
                        <a className="modal-close close is-info mb-1" alt="close modal" href="#app">
                            Close
                        </a>
                    </p>
                </div>
            </Modal>
        </div >
    );
}

const Close = () => {
    return (
        <a className="close modal-close has-color-black" href="#app" title="Close">Close</a>
    );
}

export default Login;
