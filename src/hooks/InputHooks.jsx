import { useState } from 'react';

export const useFormInput = (initialState, getErrorMessage, emptyValue) => {
    const [value, setValue] = useState(initialState);
    const [error, setError] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);
    const [isRequired, setIsRequired] = useState(true);

    if (!getErrorMessage) getErrorMessage = () => '';
    if (!emptyValue) emptyValue = '';

    const handleChange = (e) => {
        if (isDisabled) return;
        setValue(e.target.value);
    }

    const handleBlur = (e) => {
        e.target.value = value.trim();
        handleChange(e);
        validate();
    }

    const handleFocus = (e) => setError('');

    const isValid = () => error === '';

    const getValue = () => value;

    const validate = () => {
        if (!isRequired) return '';

        const errorMessage = getErrorMessage(value);
        setError(errorMessage);
        return errorMessage;
    };

    const reset = () => {
        setValue(emptyValue);
        setError('');
    };

    const disable = () => setIsDisabled(true);

    const enable = () => setIsDisabled(false);

    return {
        getValue,
        setValue,
        setError,
        isValid,
        validate,
        reset,
        disable,
        enable,
        isRequired: setIsRequired,
        props: {
            value,
            hasError: error,
            disabled: isDisabled,
            onChange: handleChange,
            onBlur: handleBlur,
            onFocus: handleFocus,
        }
    };
};
