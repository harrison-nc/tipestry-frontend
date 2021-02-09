import { validateEmail } from '../../../util/validators';
import { useFormInput } from '../../../hooks/InputHooks';

export const useInputs = () => {
    const email = useFormInput('', value => {
        const validator = validateEmail;

        if (!value)
            return 'Please enter an email.';
        else if (!validator(value))
            return 'Please enter a valid email.';

        else
            return '';
    });

    const password = useFormInput('', value => {
        if (!value)
            return 'Please enter a password.';

        else
            return '';
    });

    return Object.freeze({
        email,
        password,

        asArray() {
            return [this.email, this.password];
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
