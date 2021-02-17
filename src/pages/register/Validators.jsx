import { isEmail } from '../../util/validators';

export const NameValidator = value => {
    if (!value)
        return 'name is required';
    else if (value.length < 4)
        return 'name should have at least 4 characters';
    else if (value.length > 15)
        return 'name should have at most 15 characters';
    else
        return '';
};

export const EmailValidator = value => {
    if (!value)
        return 'email is required';
    else if (!isEmail(value))
        return 'please enter a valid email';
    else
        return '';
};

export const PasswordValidator = value => {
    if (!value)
        return 'password is required';
    else if (value.length < 5)
        return 'password should have at least 5 characters';
    else
        return '';
};

export const ConfirmPaswordValidator = password => {
    return (value) => {
        if (!value)
            return 'please confirm password';
        else if (value !== password)
            return 'Password do not match.';
        else
            return '';
    };
};
