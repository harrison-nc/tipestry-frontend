const of = (data, headers = {}) => {
    if (data instanceof Error) {
        console.debug(data);

        return {
            statusCode: 400,
            body: JSON.stringify({ error: data.message })
        }
    }

    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type,Accept",
            "Content-Type": "application/json",
            ...headers
        },
        body: JSON.stringify(data)
    }

};

const ofError = error => {
    return {
        statusCode: 400,
        body: JSON.stringify(error)
    }
};

const ofInternalError = error => {
    return {
        statusCode: 500,
        body: JSON.stringify(error)
    }
};

module.exports = { of, ofError, ofInternalError };
