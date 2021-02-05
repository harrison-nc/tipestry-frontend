import React, { useState } from 'react';
import { validateEmail } from '../util/validators';
import { useFormInput } from '../hooks/InputHooks';
import { Email, Password, ConfirmPassword, Name } from '../components/Input';
import FancyButton from '../components/FancyButton';
import { registerUser } from '../App';
import { useBackgroundNavigator } from '../hooks/useBackgroundNavigator';

const Register = ({ id, isModal }) => {
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
        // else window.location.href = '#rfailure';
        console.error(error);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = Inputs.validateAll();

        if (!isValid) return;

        Inputs.disableAll();

        try {
            const { error } = await registerUser({
                name: Inputs.name.getValue(),
                email: Inputs.email.getValue(),
                password: Inputs.password.getValue(),
            });

            if (error) handleSubmitFailure(error);
        }
        catch (ex) {
            handleSubmitFailure(ex);
        }

        Inputs.enableAll();
    };

    return (
        <div className="register is-flex">
            <div id={id} className="is-flex flex-column register__content has-background-white box py-4 px-3" >

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

const Header = ({ onClose }) => {
    return (
        <div className="header is-flex">
            <p className="title has-text-link">
                Register user
            </p>
            <button className="close btn" onClick={onClose}>X</button>
        </div>
    );
};

const Control = (props) => {
    const { isModal, onClear, onSubmit } = props;
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
        <div className="register__control is-flex mt-3">
            <input className="btn cancel is-white is-outlined is-bold" type="button" value="clear" onClick={onClear} disabled={isSending} />
            <FancyButton className="is-primary btn is-bold"
                text="Register"
                ref={ref}
                isSending={isSending}
                onClick={handleSubmit} />
        </div>
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
        },

        disableAll() {
            this.asArray().forEach(i => i.disable());
        },

        enableAll() {
            this.asArray().forEach(i => i.enable());
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

export default Register;
