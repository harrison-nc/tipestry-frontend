import React from 'react';

export const InputContainer = (props) => {
    const { children, label, hasError, ...rest } = props;

    const errorClasses = "error";

    return (
        <div className="input-container control" {...rest}>
            <fieldset className="is-flex flex-column field py-5 px-5">
                <span className={errorClasses}>{hasError}</span>
                <legend className="legend">{label}</legend>
                {children}
            </fieldset>
        </div>
    );
};

export default function Input(props) {
    const { id, name, label, hasError, ...rest } = props;

    return (
        <InputContainer label={label} hasError={hasError}>
            <input className="input py-4 px-4"
                id={id ? id : name}
                name={name}
                {...rest}
                required={true} />
        </InputContainer>
    );
};

export const createInput = (attrs) => {
    const { name, type, label, placeholder, id } = attrs;
    const defaultId = id;

    return (props) => {
        const { id, ...rest } = props;
        const currentId = id ? id : defaultId;

        return (
            <Input id={currentId ? currentId : name}
                label={label}
                type={type}
                name={name}
                placeholder={placeholder}
                {...rest} />
        );
    }
}

export const createInputTextArea = (attrs) => {
    const { id, name, label, placeholder } = attrs;
    const defaultId = id;

    return (props) => {
        const { id, hasError, ...rest } = props;
        const currentId = id ? id : defaultId;

        return (
            <InputContainer label={label} hasError={hasError}>
                <textarea className="input py-4 px-4"
                    id={currentId ? currentId : name}
                    name={name}
                    placeholder={placeholder}
                    {...rest}>
                </textarea>
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
