export const createValidator = (fun) => {
    return {
        getErrorMessage(value) {
            return fun(value);
        },
        isValid(value) {
            return !this.getErrorMessage(value);
        },
        validate(value) {
            const error = this.getErrorMessage(value);

            if (this.setError) this.setError(error);

            else console.error(`'${this.setError}' function not defined`);
        }
    }
};

export const isEmail = (value) => {
    const emailPattern = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;

    if (emailPattern.test(value)) return true;

    else return false;
}
