import { useFormInput } from './useFormInput';
import {
    NameValidator,
    EmailValidator,
    PasswordValidator,
    ConfirmPaswordValidator
} from '../pages/register/Validators';

export const useRegisterInputs = () => {
    const name = useFormInput('', NameValidator);
    const email = useFormInput('', EmailValidator);
    const password = useFormInput('', PasswordValidator);
    const cpassword = useFormInput('', ConfirmPaswordValidator(password.getValue()));

    return Object.freeze({
        name,
        email,
        password,
        cpassword,

        asArray() {
            return [this.name, this.email, this.password, this.cpassword];
        },

        validateAll() {
            const validate = input => input.validate() === '';
            const isValid = (a, b) => a && b;
            return this.asArray().map(validate).reduce(isValid, true);
        },

        disableAll() {
            this.asArray().forEach(i => i.disable());
        },

        enableAll() {
            this.asArray().forEach(i => i.enable());
        }
    });
};
