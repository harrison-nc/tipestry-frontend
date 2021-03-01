import React, { useReducer } from 'react';
import { Email, Password, ConfirmPassword, Name } from '../../components/Input';
import { useNavigator } from '../../hooks/useNavigator';
import { Control } from "./Control";
import { Header } from "./Header";
import { RegisterError, registerUser } from '../../data/user';
import { isEmail } from '../../util/validators';

export default function Register({ isModal }) {
    const navigator = useNavigator(isModal);
    const [state, dispatch, validateState, isValid] = useState();

    const handleChange = (event) => {
        const { name, value } = event.target;
        dispatch({ type: name.toUpperCase(), value });
    }

    const handleBlur = (event) => {
        validateState(state, event.target.name);
    }

    const handleFocus = (event) => {
        const { name } = event.target;
        dispatch({ type: `${name.toUpperCase()}_ERROR`, value: '' });
    }

    const handleClear = () => {
        dispatch({ type: "CLEAR" });
    };

    const handleClose = (event) => {
        handleClear(event);
        navigator.goBack();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        validateState(state);

        if (!isValid()) {
            return;
        }

        dispatch({ type: 'SENDING', value: true });

        try {
            const { name, email, password } = state;

            const data = new FormData();
            data.append('name', name);
            data.append('email', email);
            data.append('password', password);

            await registerUser(data);

            dispatch({ type: 'SENDING', value: false });
            navigator.goBack();

        } catch (error) {
            dispatch({ type: 'SENDING', value: false });
            parseError(error, dispatch);
        }
    };

    return (
        <div className="register rows">
            <form className="columns register__content has-background-white box py-4 px-3"
                onSubmit={handleSubmit}
                noValidate>

                <Header onClose={handleClose} />

                <Name
                    autoComplete="name"
                    value={state.name}
                    errorMessage={state.nameErrorMessage}
                    disabled={state.isSending}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={handleFocus} />

                <Email
                    autoComplete="email"
                    value={state.email}
                    errorMessage={state.emailErrorMessage}
                    disabled={state.isSending}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={handleFocus} />

                <Password
                    autoComplete="new-password"
                    value={state.password}
                    errorMessage={state.passwordErrorMessage}
                    disabled={state.isSending}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={handleFocus} />

                <ConfirmPassword
                    autoComplete="new-password"
                    value={state.cpassword}
                    errorMessage={state.cpasswordErrorMessage}
                    disabled={state.isSending}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={handleFocus} />

                <span className="error">{state.errorMessage}</span>

                <Control
                    isSending={state.isSending}
                    isDisabled={!isValid()}
                    onClear={handleClear} />
            </form>
        </div >
    );
};

const useState = () => {
    const [state, dispatch] = useReducer(reducer, {
        name: '',
        email: '',
        password: '',
        cpassword: '',
        isSending: false,
    });

    const validateName = (name) => {
        let errorMessage = '';
        if (!name) errorMessage = "Please enter a valid name";
        else if (name.length < 4) errorMessage = "Name must have at least 4 letters";
        else if (name.length > 15) errorMessage = "Name must have less than 15 letters";
        dispatch({ type: "NAME_ERROR", value: errorMessage });
    };

    const validateEmail = (email) => {
        let errorMessage = '';
        if (!email) errorMessage = "Please enter a valid email";
        else if (!isEmail(email)) errorMessage = "Email is not valid";
        dispatch({ type: "EMAIL_ERROR", value: errorMessage });
    };

    const validatePassword = (password, cpassword) => {
        let errorMessage = '';
        if (!password) errorMessage = "Please enter a valid password";
        else if (password.length < 5) errorMessage = "Password must have at least 5 letters";
        else if (cpassword && password !== cpassword) errorMessage = "Passwords do not match";
        dispatch({ type: !cpassword ? "PASSWORD_ERROR" : "CPASSWORD_ERROR", value: errorMessage });
    }

    const validate = (state, name) => {
        name = name || '';

        switch (name.toUpperCase()) {
            case "NAME": {
                validateName(state.name);
                break;
            }
            case "EMAIL": {
                validateEmail(state.email);
                break;
            }
            case "PASSWORD": {
                const { password, cpassword } = state;
                validatePassword(password);
                if (password && cpassword) validatePassword(password, cpassword);
                break;
            }
            case "CPASSWORD": {
                validatePassword(state.password, state.cpassword);
                break;
            }
            default:
                validateName(state.name);
                validateEmail(state.email);
                validatePassword(state.password);
                validatePassword(state.password, state.cpassword);
                break;
        }
    };

    const isValid = () => {
        return !(state.name === '' || state.email === '') &&
            !(state.password === '' || state.cpassword === '') &&
            (!state.nameErrorMessage || state.nameErrorMessage === '') &&
            (!state.emailErrorMessage || state.emailErrorMessage === '') &&
            (!state.passwordErrorMessage || state.passwordErrorMessage === '') &&
            (!state.cpasswordErrorMessage || state.cpasswordErrorMessage === '') &&
            (!state.errorMessage || state.errorMessage === '');
    };

    return [state, dispatch, validate, isValid];
};

const reducer = (state, action) => {
    const { value } = action;

    delete state.errorMessage;

    switch (action.type) {
        case "NAME": {
            return {
                ...state,
                name: value,
                nameErrorMessage: '',
            }
        }
        case "EMAIL": {
            return {
                ...state,
                email: value,
                emailErrorMessage: '',
            }
        }
        case "PASSWORD": {
            return {
                ...state,
                password: value,
                passwordErrorMessage: '',
            }
        }
        case "CPASSWORD": {
            return {
                ...state,
                cpassword: value,
                cpasswordErrorMessage: '',
            }
        }
        case "SENDING": {
            return {
                ...state,
                isSending: value,
            }
        }
        case "CLEAR": {
            return {
                name: '',
                email: '',
                password: '',
                cpassword: '',
                isSending: false,
            }
        }
        case "NAME_ERROR": {
            return {
                ...state,
                nameErrorMessage: value,
            }
        }
        case "EMAIL_ERROR": {
            return {
                ...state,
                emailErrorMessage: value,
            }
        }
        case "PASSWORD_ERROR": {
            return {
                ...state,
                passwordErrorMessage: value,
            }
        }
        case "CPASSWORD_ERROR": {
            return {
                ...state,
                cpasswordErrorMessage: value,
            }
        }
        case "ERROR": {
            return {
                ...state,
                errorMessage: value,
            }
        }
        default:
            return state;
    }
};

const parseError = (error, dispatch) => {
    if (error instanceof RegisterError) {
        const { errors, errorMessage } = error.data;

        if (errors) {
            function dispatchError(error) {
                const { key, errorMessage } = error;
                dispatch({ type: `${key.toUpperCase()}_ERROR`, value: errorMessage });
            }
            errors.forEach(dispatchError);

        } else if (errorMessage) {
            dispatch({ type: "ERROR", value: errorMessage });
        } else {
            console.error(error);
        }
    } else {
        console.error(error);
    }
};
