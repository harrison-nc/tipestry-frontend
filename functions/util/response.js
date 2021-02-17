const _options = { status: 200, headers: {} };
const _errorOptions = { status: 400 };

const of = (data, options = _options) => {
    const { status, headers } = options;
    let response;

    if (data instanceof Error) {
        return ofError(data);
    } else {
        response = createResponse(data);
    }

    return {
        statusCode: status || _options.status,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type,Accept",
            "Content-Type": "application/json",
            ...headers
        },
        body: JSON.stringify(response)
    }

};

const ofError = (error, options = _errorOptions) => {
    console.debug(error);

    const { status } = options;

    let response;

    if (typeof error === 'string') {
        response = createError(error);
    } else if (error instanceof Error) {
        response = createError(error.message);
    } else {
        response = error;
    }

    return {
        statusCode: status || _errorOptions.status,
        body: JSON.stringify(response)
    }
};

const createResponse = (data) => {
    return { data };
};

const createError = (message) => {
    return { errorMessage: message };
}

module.exports = { of, ofError };
