const User = require('../util/model/user');
const Response = require('../util/response');
const { parseJoiError } = require('../util/error');
const loginValidator = require('../util/model/login');
const { connect, close } = require('../util/database');

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return Response.of(new Error(`Request method ${event.httpMethod} not supported`));
    }

    const body = JSON.parse(event.body);
    const { email, password } = body;

    try {
        const { error } = loginValidator({ email, password });

        if (error) return Response.of(new Error(parseJoiError(error)));

    }
    catch (ex) {
        console.debug(ex);
        return Response.of(new Error({ errorMessage: 'login validation failed' }));
    }

    try {
        connect();
    } catch (ex) {
        console.debug(ex);
        return Response.of(new Error({ errorMessage: "Internal server error" }));
    }

    try {
        const result = await User.login(email, password);

        close();

        if (!result.succeeded) {
            const error = { login: "Invalid username or password" };
            return Response.of({ error });
        }

        const { token, user } = result;
        const { name } = user;
        const login = { name, email, token };

        return Response.of({ login }, { 'x-auth-token': token });
    }
    catch (ex) {
        close();
        console.debug(ex);
        return Response.of(new Error({ errorMessage: "Failed to login user account." }));
    }
};
