import { useState } from 'react';

export const useFormInputWithValidator = (initialState, getErrorMessage) => {
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