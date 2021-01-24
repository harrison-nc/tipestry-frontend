import '../css/modal.css';
import React, { Fragment } from 'react';
import { validateEmail } from '../util/validators';
import { FormModal, createModal } from './modal/Modal';
import { Email, Password, ConfirmPassword, Name } from './Input';

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
            console.error(ex);
        }
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
                    <Email {...Inputs.email.props} />
                    <Password {...Inputs.password.props} />
                    <ConfirmPassword {...Inputs.cpassword.props} />
                    <Control onClear={handleClear} />
                </FormModal>
            </div >
            <Dailog
                id="rsuccess"
                type="success"
                text="Account created successfully"
            />
            <Dailog
                id="rfailure"
                type="failure"
                text="Account creation failed"
            />
        </Fragment>
    );
};

const useInputs = () => {
    const inputs = {
        name: useFormInput('', NameValidator),
        email: useFormInput('', EmailValidator),
        password: useFormInput('', PasswordValidator),

        asArray() {
            return [this.name, this.email, this.password, this.cpassword];
        },

        validateAll() {
            const validate = input => input.validate() === '';
            const isValid = (a, b) => a && b;
            return this.asArray().map(validate).reduce(isValid, true);
        }
    };

    inputs.cpassword = useFormInput('', ConfirmPaswordValidator(inputs.password.getValue()));

    return inputs;
};

const useFormInput = (initialState, getErrorMessage) => {
    const [value, setValue] = useState(initialState);
    const [error, setError] = useState('');

    const handleChange = (e) => setValue(e.target.value);

    const handleBlur = (e) => validate();

    const handleFocus = (e) => setError('');

    const isValid = () => error === '';

    const getValue = () => value;

    const validate = () => {
        const errorMessage = getErrorMessage(value);
        setError(errorMessage);
        return errorMessage;
    };

    const reset = () => {
        setValue('');
        setError('');
    };

    return {
        getValue,
        setValue,
        setError,
        isValid,
        validate,
        reset,
        props: {
            value,
            hasError: error,
            onChange: handleChange,
            onBlur: handleBlur,
            onFocus: handleFocus,
        }
    };
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

const Email = createInput('email', 'email', 'Email*', 'Enter email address', 'register-email');
const Name = createInput('name', 'name', 'Username*', 'Enter username');
const Password = createInput('password', 'password', 'Password*', 'Enter password', 'register-password');
const ConfirmPassword = createInput('cpassword', 'password', 'Confirm password*', 'Confirm password');

const Control = (props) => {
    const { onClear } = props;

    return (
        <div className="control buttons is-flex mt-3">
            <input className="close modal-close btn" type="button" value="clear" onClick={onClear} />
            <input className="is-primary has-color-white btn py-4 px-3" type="submit" value="Register" />
        </div>
    );
};

const Dailog = (props) => {
    const { id, type, text } = props;

    return (
        <Modal id={id}>
            <div
                className={type + " box is-flex flex-column has-background-white py-3 px-3"}>
                <p className="flex-grow is-flex subtitle">
                    {text}
                </p>
                <a className="modal-close close" alt="close modal" href="#app">Close</a>
            </div>
        </Modal>
    );
};

export default Register;
