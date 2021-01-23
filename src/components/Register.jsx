import '../css/modal.css';

import React, { useState } from 'react';

import { createValidator, validateEmail } from '../util/validators';

import Modal, { FormModal } from './Modal';
import { createInput } from './Input';

const Email = createInput('email', 'email', 'Email', 'Enter email address', 'register-email');
const Name = createInput('name', 'name', 'Username', 'Enter username');
const Password = createInput('password', 'password', 'Password', 'Enter password', 'register-password');
const ConfirmPassword = createInput('cpassword', 'password', 'Confirm password', 'Confirm password');

const NameValidator = createValidator(value => {
    if (!value) return 'name is required';
    else if (value.length < 4) return 'name should have at least 4 characters';
    else if (value.length > 15) return 'name should have at most 15 characters';
    else return '';
});

const EmailValidator = createValidator(value => {
    if (!value) return 'email is required';
    else if (!validateEmail(value)) return 'please enter a valid email';
    else return '';
});

const PasswordValidator = createValidator(value => {
    if (!value) return 'password is required';
    else if (value.length < 5) return 'password should have at least 5 characters';
    else return '';
});

const ConfirmPaswordValidator = (password) => {
    return createValidator((value) => {
        if (!value) return 'please confirm password';
        else if (value !== password) return 'Password do not match.';
        else return '';
    });
};

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

    const Validators = {
        name: {
            ...NameValidator,
            setValue: setName,
            setError: setNameError,
        },
        email: {
            ...EmailValidator,
            setValue: setEmail,
            setError: setEmailError,
        },
        password: {
            ...PasswordValidator,
            setValue: setPassword,
            setError: setPasswordError
        },
        cpassword: {
            ...ConfirmPaswordValidator(password),
            setValue: setConfirmPassword,
            setError: setConfirmPasswordError
        }
    };

    const isValid = (name, value) => {
        const validator = Validators[name];

        if (!validator) return false;

        return validator.isValid(value);
    };

    const validateInputs = () => {
        console.log('check name', isValid('name', name));
        console.log('check email', isValid('name', name));
        console.log('check password', isValid('cpassword', cpassword));

        return isValid('name', name)
            && isValid('email', email)
            && isValid('password', password)
            && isValid('cpassword', cpassword);
    };

    const reportValidity = () => {
        resetError();

        checkValidity('name', name);
        checkValidity('email', email);
        checkValidity('password', password);
        checkValidity('cpassword', cpassword);
    }

    const checkValidity = (name, value) => {
        const input = Validators[name];

        if (!input) return console.error(`'${name}' is not a valid input`);

        else input.validate(value);
    };

    const resetError = (name) => {
        const input = Validators[name];

        if (input) return input.setError('');

        else console.error(`'${name}' is not a valid input`);
    };

    const reset = () => {
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    }

    const showError = (error) => {
        const { key, value, message } = error;

        const input = Validators[key];

        if (input) input.setError(message);

        else console.error(`Server Error: ${message}`);

        console.log(`Error: '${key}' - '${value}`);
    };

    const handleClose = (e) => {
        reset();
        window.location.href = '#app';
    };

    const handleBlur = ({ target }) => checkValidity(target.name, target.value);

    const handleFocus = ({ target }) => resetError(target.name);

    const handleChange = (e) => {
        const { target } = e;
        const { name, value } = target;

        const input = Validators[name];

        if (input) return input.setValue(value);

        console.error(`'${name}' is not a valid input`);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = validateInputs();

        if (isValid) try {
            const { error } = await onRegister({ name, email, password });

            if (error) {

                if (error instanceof Array) error.forEach(err => showError(err));

                else if (error instanceof Object) showError(error);

                else window.location.href = '#rfailure';

                console.error(error);
            }

            else window.location.href = "#rsuccess";

        } catch (ex) {
            window.location.href = "#rfailure";
            console.error(ex);
        }

        else reportValidity();
    };

    return (
        <div className="register">
            <FormModal id={id} method="post"
                title="Register user"
                onReset={handleClose}
                onSubmit={handleSubmit}>

                <Name value={name} hasError={nameError} onBlur={handleBlur} onFocus={handleFocus} onChange={handleChange} />
                <Email value={email} hasError={emailError} onBlur={handleBlur} onFocus={handleFocus} onChange={handleChange} />
                <Password value={password} hasError={passwordError} onBlur={handleBlur} onFocus={handleFocus} onChange={handleChange} />
                <ConfirmPassword value={cpassword} hasError={cpasswordError} onBlur={handleBlur} onFocus={handleFocus} onChange={handleChange} />

                <div className="control buttons is-flex mt-3">
                    <input className="close modal-close btn" type="reset" value="Close" />
                    <input className="is-primary has-color-white btn py-4 px-3" type="submit" value="Register" />
                </div>
            </FormModal>

            <Modal id="rsuccess" classes="box hax-background-white">
                <div className="success is-flex flex-column box has-background-white py-3 px-3">
                    <p className="flex-grow is-flex subtitle">Account created successfully</p>
                    <p className="close-container flex-grow is-flex">
                        <a className="modal-close close is-success mb-1" alt="close modal" href="#app">
                            close
                        </a>
                    </p>
                </div>
            </Modal>

            <Modal id="rfailure" classes="box hax-background-white">
                <div className="failure is-flex flex-column box has-background-white py-3 px-3">
                    <p className="flex-grow is-flex subtitle">Account creation failed</p>
                    <p className="close-container flex-grow is-flex">
                        <a className="modal-close close is-info mb-1" alt="close modal" href="#app">
                            Close
                        </a>
                    </p>
                </div>
            </Modal>
        </div >
    );
};

export default Register;
