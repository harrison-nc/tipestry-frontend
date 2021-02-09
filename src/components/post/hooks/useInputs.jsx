import { useFormInput } from '../../../hooks/InputHooks';

export const useInputs = () => {
    const url = useFormInput('', value => {
        return !value ? 'Resource url is required' : '';
    });

    const title = useFormInput('', value => {
        return !value ? 'Title is required' : '';
    });

    const tagItems = useFormInput(['tag'], () => '', []);
    const tagName = useFormInput('');
    const description = useFormInput('');
    const upload = useFormInput();

    return Object.freeze({
        url,
        title,
        description,
        tagItems,
        tagName,
        upload,

        asArray() {
            return [url, title, description, tagItems, tagName, upload];
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
