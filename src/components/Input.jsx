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

export default function Input(props) {
    const { id, label, type, name, value, placeholder, hasError } = props;
    const { onChange, onBlur, onFocus } = props;

    return (
        <InputContainer label={label} hasError={hasError}>
            <input className="input py-4 px-4 size-medium"
                id={id ? id : name}
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                onBlur={onBlur}
                onFocus={onFocus}
                required={true} />
        </InputContainer>
    );
};

export const createInput = (attrs) => {
    const { name, type, label, placeholder, id } = attrs;
    const defaultId = id;

    return (props) => {
        const { id, value, hasError } = props;
        const { onChange, onBlur, onFocus } = props;
        const currentId = id ? id : defaultId;

        return (
            <Input id={currentId ? currentId : name}
                label={label}
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                hasError={hasError}
                onBlur={onBlur}
                onFocus={onFocus}
                onChange={onChange} />
        );
    }
}

export const createInputTextArea = (attrs) => {
    const { id, name, label, placeholder } = attrs;
    const defaultId = id;

    return (props) => {

        const { id, value, hasError } = props;
        const { onChange, onBlur, onFocus } = props;
        const currentId = id ? id : defaultId;

        return (
            <InputContainer label={label} hasError={hasError}>
                <textarea className="input size-medium py-4 px-4"
                    id={currentId ? currentId : name}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onChange={onChange}></textarea>
            </InputContainer>
        );
    };
};

export const Email = createInput({
    name: 'email',
    type: 'email',
    label: 'Email*',
    placeholder: 'Enter email address',
});

export const Name = createInput({
    name: 'name',
    type: 'text',
    label: 'Username*',
    placeholder: 'Enter username'
});

export const Password = createInput({
    name: 'password',
    type: 'password',
    label: 'Password*',
    placeholder: 'Enter password',
});

export const ConfirmPassword = createInput({
    name: 'cpassword',
    type: 'password',
    label: 'Confirm password*',
    placeholder: 'Confirm password'
});
