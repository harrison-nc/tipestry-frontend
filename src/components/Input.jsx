import React from 'react';

const Input = (props) => {
    const {
        label,
        type,
        name,
        value,
        placeholder,
        onInput,
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
                    placeholder={placeholder}
                    onChange={onInput}
                    required={true} />
            </fieldset>
        </div>
    );
};

export const createInput = (name, type, label, placeholder) => {
    return (props) => {
        const { value, hasError, onChange } = props;

        return (
            <Input
                label={label}
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                hasError={hasError}
                onInput={onChange} />
        );
    }
}

export default Input;
