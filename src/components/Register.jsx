import '../css/modal.css';
import React, { Fragment } from 'react';
import { validateEmail } from '../util/validators';
import { FormModal, createModal } from './modal/Modal';
import { Email, Password, ConfirmPassword, Name } from './Input';
import { useFormInput } from '../hooks/InputHooks';

const Register = (props) => {
    const { id, onRegister } = props;
    const Inputs = useInputs();

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
        window.location.href = '#app';
    };

    const handleSubmitFailure = (error) => {
        if (error instanceof Array) error.forEach(err => showError(err));
        else if (error instanceof Object) showError(error);
        else window.location.href = '#rfailure';
        console.error(error);
    };

    const handleSubmitSuccess = () => {
        Inputs.asArray().forEach(input => input.reset());
        window.location.href = "#rsuccess";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = Inputs.validateAll();

        if (!isValid) return;

        try {
            const { error } = await onRegister({
                name: Inputs.name.getValue(),
                email: Inputs.email.getValue(),
                password: Inputs.password.getValue(),
            });

            if (error) handleSubmitFailure(error);
            else handleSubmitSuccess();

        }
        catch (ex) {
            handleSubmitFailure(ex);
        }
    };

    const closeButton = <input className="close modal-close btn" type="reset" value="X" />

    const form = {
        id: id,
        method: "post",
        title: "Register user",
        close: closeButton,
        onReset: handleClose,
        onSubmit: handleSubmit,
    };

    return (
        <Fragment>
            <div className="register">
                <FormModal {...form}>
                    <Name {...Inputs.name.props} />
                    <Email id="r-email" {...Inputs.email.props} />
                    <Password id="r-password" {...Inputs.password.props} />
                    <ConfirmPassword {...Inputs.cpassword.props} />
                    <Control onClear={handleClear} />
                </FormModal>
            </div >
            <Failure />
            <Success />
        </Fragment>
    );
};

const useInputs = () => {
    const name = useFormInput('', NameValidator);
    const email = useFormInput('', EmailValidator);
    const password = useFormInput('', PasswordValidator);
    const cpassword = useFormInput('', ConfirmPaswordValidator(password.getValue()));

    return Object.freeze({
        name,
        email,
        password,
        cpassword,

        asArray() {
            return [this.name, this.email, this.password, this.cpassword];
        },

        validateAll() {
            const validate = input => input.validate() === '';
            const isValid = (a, b) => a && b;
            return this.asArray().map(validate).reduce(isValid, true);
        }
    });
};

const NameValidator = value => {
    if (!value) return 'name is required';
    else if (value.length < 4) return 'name should have at least 4 characters';
    else if (value.length > 15) return 'name should have at most 15 characters';
    else return '';
};

const EmailValidator = value => {
    if (!value) return 'email is required';
    else if (!validateEmail(value)) return 'please enter a valid email';
    else return '';
};

const PasswordValidator = value => {
    if (!value) return 'password is required';
    else if (value.length < 5) return 'password should have at least 5 characters';
    else return '';
};

const ConfirmPaswordValidator = (password) => {
    return (value) => {
        if (!value) return 'please confirm password';
        else if (value !== password) return 'Password do not match.';
        else return '';
    };
};

const Control = (props) => {
    const { onClear } = props;

    return (
        <div className="control buttons is-flex mt-3">
            <input className="close modal-close btn" type="button" value="clear" onClick={onClear} />
            <input className="is-primary has-color-white btn py-4 px-3" type="submit" value="Register" />
        </div>
    );
};

const Success = createModal({
    id: "rsuccess",
    type: "success",
    text: "Account created successfully",
});

const Failure = createModal({
    id: "rfailure",
    type: "failure",
    text: "Account creation failed",
});

export default Register;
