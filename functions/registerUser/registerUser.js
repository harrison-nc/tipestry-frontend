const User = require('../util/model/user');
const Response = require('../util/response');
const { parseJoiError } = require('../util/error');
const { connect, close } = require('../util/database');

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return Response.of(new Error(`Request method ${event.httpMethod} not supported`));
    }

    const bodyParams = new URLSearchParams(event.body);
    const body = Object.fromEntries(bodyParams);

    try {
        connect();
    } catch (ex) {
        throw ex;
    }

    try {
        await verifyEmail(body.email);
    }
    catch (ex) {
        close();
        console.debug(ex);
        return Response.of(ex);
    }

    const { name, email, password } = body;
    const user = { name, email, password };

    try {
        const { validationError } = await User.validateModel(user);

        if (validationError) {
            return Response.of(new Error(parseJoiError(validationError)));
        }
    }
    catch (ex) {
        console.debug(ex);
        return Response.of(new Error({ errorMessage: 'User validation failed' }));
    }

    try {
        await User.newUser(user);

        close();

        return Response.of({ name, email });
    }
    catch (ex) {
        close();
        console.debug(ex);
        return Response.of(new Error({ errorMessage: "Failed to create user account." }));
    }
};

async function verifyEmail(email) {
    const exists = await User.findByEmail(email);

    if (exists) {
        throw new Error({ key: 'email', email, message: 'Email already exist.' });
    }

    return true;
}
