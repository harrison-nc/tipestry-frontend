const _options = { status: 200, headers: {} };
const _errorOptions = { status: 400 };

const of = (data, options = _options) => {
    const response = getResponse(data);
    const { status, headers } = options;

    return {
        statusCode: status,
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
    let response = getResponse(error);

    return {
        statusCode: status,
        body: JSON.stringify(response)
    }
};

const ofAny = (data, options = _options) => {
    if (data instanceof Error) return ofError(data);

    return of(data, options);
};

const createResponse = (data) => {
    return { data };
};

const createError = (message) => {
    return { errorMessage: message };
}

const getResponse = (data) => {
    let response;

    if (data instanceof Error) {

        response = createError(data);

    } else {

        response = createResponse(data);

    }

    return response;
};

module.exports = { of, ofAny, ofError };
