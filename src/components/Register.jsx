import '../css/modal.css';

import React, { useState } from 'react';

import { FormModal } from './Modal';
import { createInput } from './Input';

const Email = createInput('email', 'email', 'Email', 'Enter email address');
const Name = createInput('name', 'name', 'Username', 'Enter username');
const Password = createInput('password', 'password', 'Password', 'Enter password');
const ConfirmPassword = createInput('cpassword', 'password', 'Confirm password', 'Confirm password');

const Register = (props) => {
    const { id, onRegister } = props;

    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [cpassword, setConfirmPassword] = useState('');
    const [cpasswordError, setConfirmPasswordError] = useState('');

    const reportValidity = () => {
        const noError = '';

        resetInputError();

        checkValidity('name', name);
        checkValidity('email', email);
        checkValidity('password', password);
        checkValidity('cpassword', cpassword);

        return nameError === noError
            && emailError === noError
            && passwordError === noError
            && cpasswordError === noError;
    }

    const checkValidity = (name, value, errorMessage = '') => {
        const noError = '';

        switch (name) {
            case 'name': {
                if (errorMessage) setNameError(errorMessage);
                else if (!value) setNameError('name is required');
                else if (value.length < 4) setNameError('name should have at least 4 characters');
                else if (value.length > 15) setNameError('name should have at most 15 characters');
                else setNameError(noError);
                break;
            }
            case 'email': {
                const re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;

                if (errorMessage) setEmailError(errorMessage);
                else if (!value) setEmailError('email is required');
                else if (!re.test(value)) setEmailError('please enter a valid email');
                else setEmailError(noError);
                break;
            }
            case 'password': {
                if (errorMessage) setPasswordError(errorMessage);
                else if (!value) setPasswordError('password is required');
                else if (value.length < 5) setPasswordError('password should have at least 5 characters');
                else setPasswordError('');
                break;
            }
            case 'cpassword': {
                if (errorMessage) setConfirmPasswordError(errorMessage);
                else if (!value) setConfirmPasswordError('please enter password again');
                else if (!(value === password)) setConfirmPasswordError('Passwords do not match.');
                else setConfirmPasswordError(noError);
                break;
            }
            default: {
                console.error(`Invalid property "${name}"`);
            }
        }
    };

    const resetInputError = (name) => {
        const noError = '';
        switch (name) {
            case 'name':
                setNameError(noError);
                break;
            case 'email':
                setEmailError(noError);
                break;
            case 'password':
                setPasswordError(noError);
                break;
            case 'cpassword':
                setConfirmPasswordError(noError);
                break;
            default:
                setNameError(noError);
                setEmailError(noError);
                setPasswordError(noError);
                setConfirmPasswordError(noError);
                break;
        }
    };

    const resetInputValue = () => {
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    }

    const handleClose = (e) => {
        resetInputValue();
        resetInputError();
        window.location.href = '#app';
    };

    const handleChange = (e) => {
        const { target } = e;
        const { name, value } = target;

        switch (name) {
            case 'name': {
                setName(value);
                break;
            }
            case 'email': {
                setEmail(value);
                break;
            }
            case 'password': {
                setPassword(value);
                break;
            }
            case 'cpassword': {
                setConfirmPassword(value);
                break;
            }
            default: {
                console.error(`Invalid input ${name}`);
            }
        }

        resetInputError(name);
        checkValidity(name, value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (reportValidity()) {

            try {
                const result = await onRegister({ name, email, password });

                if (result.error) {

                    const showError = (error) => {
                        const { key, value, message } = error;
                        checkValidity(key, value, message);
                    };

                    const { error } = result;

                    if (error instanceof Array) error.forEach(err => showError(err));

                    else if (error instanceof Object) showError(error);

                    else console.error(error);

                    return null;
                }



                console.log(result);
            }
            catch (ex) {
                console.error(ex);
            }
        }

        return null;
    };

    return (
        <FormModal id={id} method="post"
            title="Register user"
            onReset={handleClose}
            onSubmit={handleSubmit}>

            <Name value={name} hasError={nameError} onChange={handleChange} />
            <Email value={email} hasError={emailError} onChange={handleChange} />
            <Password value={password} hasError={passwordError} onChange={handleChange} />
            <ConfirmPassword value={cpassword} hasError={cpasswordError} onChange={handleChange} />

            <div className="control buttons is-flex mt-3">
                <input className="close modal-close btn" type="reset" value="Close" />
                <input className="is-primary has-color-white btn py-4 px-3" type="submit" value="Register" />
            </div>
        </FormModal>
    );
};

export default Register;
