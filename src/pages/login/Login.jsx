import React, { useReducer } from 'react';
import { Header } from './Header';
import { Control } from "./Control";
import { useNavigator } from '../../hooks/useNavigator';
import { Email, Password } from '../../components/Input';
import { isEmail } from '../../util/validators';

export default function Login({ isModal, onLogin }) {
    const navigator = useNavigator(isModal);
    const [state, dispatch, validateState, isValid] = useLoginState();

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

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!isValid()) {
            console.debug('# invalid input');
            return;
        }

        dispatch({ type: 'SENDING', value: true });
        const { email, password } = state;
        const result = await onLogin({ email, password });
        dispatch({ type: 'SENDING', value: false });

        if (!result) {
            navigator.goBack();
            return;
        }

        const { errors, errorMessage } = result;

        if (errors) {
            errors.forEach((error) => {
                const { key, errorMessage } = error;
                dispatch({
                    type: `${key.toUpperCase()}_ERROR`, value: errorMessage
                });
            });
        } else if (errorMessage) {
            dispatch({
                type: "ERROR", value: errorMessage
            });
        }
    }

    return (
        <div className="login is-flex">
            <form
                className="login__content is-flex flex-column has-background-white box py-4 px-3"
                method="post"
                onSubmit={handleSubmit}
                noValidate>
                <Header onClose={handleClose} />

                <Email
                    value={state.email}
                    errorMessage={state.emailErrorMessage}
                    disabled={state.isSending}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    autoComplete="email" />

                <Password
                    value={state.password}
                    errorMessage={state.passwordErrorMessage}
                    disabled={state.isSending}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    autoComplete="current-password" />

                {state.errorMessage &&
                    <span className="error">{state.errorMessage}</span>
                }

                <Control
                    isDisabled={!isValid()}
                    isSending={state.isSending}
                    onClear={handleClear} />
            </form>
        </div>
    );
}

const useLoginState = () => {
    const [state, dispatch] = useReducer(reducer, {
        email: '',
        password: '',
        isSending: false,
    });

    const validateEmail = (email) => {
        let errorMessage;
        if (!email) errorMessage = "Please enter a valid email";
        else if (!isEmail(email)) errorMessage = "Email is not valid";
        else errorMessage = '';
        dispatch({ type: "EMAIL_ERROR", value: errorMessage });
    };

    const validatePassword = (password) => {
        let errorMessage;
        if (!password) errorMessage = "Please enter a valid password";
        else if (password.length < 5) errorMessage = "Password must have at least 5 letters";
        else errorMessage = '';
        dispatch({ type: "PASSWORD_ERROR", value: errorMessage });
    }

    const validate = (state, name) => {
        name = name || '';

        switch (name.toUpperCase()) {
            case "EMAIL": {
                validateEmail(state.email);
                break;
            }
            case "PASSWORD": {
                validatePassword(state.password);
                break;
            }
            default:
                validateEmail(state.email);
                validatePassword(state.password);
                break;
        }
    };

    const isValid = () => {
        return !(state.email === '' || state.password === '') &&
            (!state.emailErrorMessage || state.emailErrorMessage === '') &&
            (!state.passwordErrorMessage || state.passwordErrorMessage === '') &&
            (!state.errorMessage || state.errorMessage === '');
    };

    return [state, dispatch, validate, isValid];
}

const reducer = (state, action) => {
    const { value } = action;

    switch (action.type) {
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
        case "SENDING": {
            return {
                ...state,
                isSending: value,
            }
        }
        case "CLEAR": {
            return {
                email: '',
                password: '',
                isSending: false,
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
        case "ERROR": {
            return {
                ...state,
                errorMessage: value
            }
        }
        default:
            console.debug('invalid action', action);
            return state;
    }
};
