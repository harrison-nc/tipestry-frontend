import React from 'react';

export const InputContainer = (props) => {
    const { children, label, hasError } = props;

    const errorClasses = "error size-medium";

    return (
        <div className="input-container control">
            <fieldset className="is-flex flex-column field py-5 px-5">
                <span className={errorClasses}>{hasError}</span>
                <legend className="legend size-medium">{label}</legend>
                {children}
            </fieldset>
        </div>
    );
};

export const createInput = (name, type, label, placeholder, id = "") => {
    return (props) => {
        const { value, hasError, onChange } = props;

        return (
            <Input id={id ? id : name}
                label={label}
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                hasError={hasError}
                onChange={onChange} />
        );
    }
}

const Input = (props) => {
    const { id, label, type, name, value, placeholder, onChange, hasError } = props;

    return (
        <InputContainer label={label} hasError={hasError}>
            <input className="input py-4 px-4 size-medium"
                id={id ? id : name}
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                required={true} />
        </InputContainer>
    );
};

export default Input;
