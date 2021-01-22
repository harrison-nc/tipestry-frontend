
const validate = (value) => {
    const emailPattern = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;

    if (emailPattern.test(value)) return true;
    else return false;
}

export default validate;
