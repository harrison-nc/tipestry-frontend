import '../css/modal.css';

import React, { useState } from 'react';

const RegisterDialog = (props) => {
    const { id, onRegister } = props;

    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [cpassword, setConfirmPassword] = useState('');
    const [cpasswordError, setConfirmPasswordError] = useState('');

    const validInput = name && email && password && cpassword;
    const btnClasses = "btn py-4 px-3" + (validInput ? " is-primary has-color-white" : " is-disable has-color-black");

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

    const checkValidity = (name, value) => {
        const noError = '';

        switch (name) {
            case 'name': {
                if (!value) setNameError('name is required');
                else if (value.length < 4) setNameError('name should have at least 4 characters');
                else if (value.length > 15) setNameError('name should have at most 15 characters');
                else setNameError(noError);
                break;
            }
            case 'email': {
                if (!value) setEmailError('email is required');
                else setEmailError(noError);
                break;
            }
            case 'password': {
                if (!value) setPasswordError('password is required');
                else if (value.length < 5) setPasswordError('password should have at least 5 characters');
                else setPasswordError('');
                break;
            }
            case 'cpassword': {
                if (!value) setConfirmPasswordError('please enter password again');
                else if (!(value === password)) setConfirmPasswordError('Passwords do not match.');
                else setConfirmPasswordError(noError);
                break;
            }
            default: {

            }
        }
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
                target.checkValidity();
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
        // window.location.href = '#app';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (reportValidity()) {
            console.log('input is valid')
        } else {
            console.log('invalid form input value');
        }

        return null;
    };

    return (
        <div id={id} className="modal-window">
            <form method="post" onReset={handleClose} onSubmit={handleSubmit} noValidate={true}>
                <div className="form is-flex flex-column box has-background-white pt-2 pb-4 px-2">
                    <p className="subtitle has-color-link flex-grow mb-2">Register user</p>



                    <Input
                        label="Email"
                        type="email"
                        name="email"
                        placeholder="Enter email address"
                        value={email}
                        hasError={emailError}
                        validate={true}
                        onInput={handleChange} />

                    <Input
                        label="Password"
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        value={password}
                        hasError={passwordError}
                        onInput={handleChange} />

                    <Input
                        label="Confirm Password"
                        type="password"
                        name="cpassword"
                        placeholder="Confirm password"
                        value={cpassword}
                        hasError={cpasswordError}
                        onInput={handleChange} />

                    <div className="control buttons is-flex mt-3">
                        <input className="close modal-close has-color-black" type="reset" value="Close" />
                        <input className={btnClasses} type="submit" value="Register" />
                    </div>
                </div>
            </form>
        </div>
    );
};

export const Input = (props) => {
    const {
        label,
        type,
        name,
        value,
        placeholder,
        onInput,
        readOnly,
        onError,
        validate,
        hasError } = props;

    const errorClasses = "error" + (hasError ? "" : " is-not-visible");

    return (
        <div className="control is-flex flex-column">
            <span className={errorClasses}>{hasError}</span>

            <fieldset>
                <legend>{label}</legend>
                <input className="input"
                    id={name}
                    type={type}
                    name={name}
                    value={value}
                    readOnly={readOnly ? true : false}
                    placeholder={placeholder}
                    onChange={onInput}
                    onInvalid={onError}
                    formNoValidate={validate ? validate : false}
                    required={true} />
            </fieldset>
        </div>
    );
};

export default RegisterDialog;
