const User = require('../util/model/user');
const Response = require('../util/response');
const { parseJoiError } = require('../util/error');
const loginValidator = require('../util/model/login');
const { connect, close } = require('../util/database');

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return Response.ofError(`Request method ${event.httpMethod} not supported`);
    }

    const body = JSON.parse(event.body);
    const { email, password } = body;

    try {
        const { error } = loginValidator({ email, password });

        if (error) return Response.ofError(parseJoiError(error));

    } catch (ex) {
        return Response.ofError({ errorMessage: 'login validation failed' });
    }

    try {
        connect();
    }
    catch (ex) {
        return Response.ofError({ errorMessage: "Internal server error" });
    }

    try {
        const result = await User.login(email, password);

        close();

        if (!result.succeeded) {
            return Response.ofError({ errorMessage: "Invalid username or password" });
        }

        const { token, user } = result;
        const { name } = user;
        const login = { name, email, token };

        return Response.of({ login }, { headers: { 'x-auth-token': token } });
    }
    catch (ex) {
        close();
        return Response.ofError({ errorMessage: "Failed to login user account." });
    }
};
