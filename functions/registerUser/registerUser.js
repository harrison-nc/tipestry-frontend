const User = require('../util/model/user');
const Response = require('../util/response');
const { parseJoiError } = require('../util/error');
const { connect, close } = require('../util/database');

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return Response.ofError(new Error(`Request method ${event.httpMethod} not supported`));
    }

    const bodyParams = new URLSearchParams(event.body);
    const body = Object.fromEntries(bodyParams);

    try {
        connect();
    }
    catch (ex) {
        throw ex;
    }

    try {
        await verifyEmail(body.email);
    }
    catch (ex) {
        close();
        return Response.ofError(ex);
    }

    const { name, email, password } = body;
    const user = { name, email, password };

    try {
        const { error } = User.validateModel(user);

        if (error) {
            return Response.ofError(parseJoiError(error));
        }
    }
    catch (ex) {
        return Response.ofError({ errorMessage: 'User validation failed' });
    }

    try {
        await User.newUser(user);

        close();

        return Response.of({ name, email });
    }
    catch (ex) {
        close();
        return Response.ofError({ errorMessage: "Failed to create user account." });
    }
};

async function verifyEmail(email) {
    const exists = await User.findByEmail(email);

    if (exists) {
        throw new Error('Email already exist.');
    }

    return true;
}
