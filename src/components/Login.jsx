import '../css/modal.css';

import React, { useState } from 'react';

import validateEmail from '../util/validateEmail.js';

import Input from './Input';
import Modal from './Modal';
import { FormModal } from './Modal';

const Login = (props) => {
    const { id, onLogin } = props;

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const noError = '';

    const checkValidity = (name, value) => {
        switch (name) {
            case 'email':
                if (!value) setEmailError('Please enter an email.');
                else if (!validateEmail(value)) setEmailError('Please enter a valid email.');
                else setEmailError(noError);
                break;

            case 'password':
                if (!value) setPasswordError('Please enter a password.');
                else setPasswordError(noError);
                break;

            default:
                break;
        }
    };

    const resetInput = () => {
        setEmail('');
        setPassword('');
    }

    const resetError = (name) => {
        switch (name) {
            case 'email':
                setEmailError(noError)
                break;

            case 'password':
                setPasswordError(noError);
                break;

            default:
                setEmailError(noError);
                setPasswordError(noError);
                break;
        }
    }

    const reportValidity = () => {
        resetError();

        checkValidity('email', email);
        checkValidity('password', password);

        return emailError === noError && passwordError === noError;
    };

    const handleReset = (e) => {
        resetInput();
        resetError();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (reportValidity()) {
            try {
                const { error } = await onLogin({ email, password });

                if (error) {

                    const showError = (error) => {
                        const { key, value, message } = error;
                        checkValidity(key, value, message);
                    };

                    if (error instanceof Array) error.forEach(err => showError(err));

                    else if (error instanceof Object) showError(error);

                    else window.location.href = '#lfailure';

                    console.error(error);
                }
            }
            catch (ex) {
                console.error(ex);
                window.location.href = '#lfailure';
            }
        }

        return null;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        switch (name) {
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
            default:
                break;
        }

        resetError(name);
        checkValidity(name, value);
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
                    onInput={handleChange}
                    placeholder="Enter email address" />

                <Input
                    label="Password"
                    type="password"
                    name="password"
                    value={password}
                    hasError={passwordError}
                    onInput={handleChange}
                    placeholder="Enter password" />

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
        <a href="#app"
            title="Close"
            className="close modal-close has-color-black">Close</a>
    );
}

export default Login;
