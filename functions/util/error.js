exports.parseJoiError = (error) => {
    const { details } = error;

    const errors = details.map((d) => {
        const { context, message } = d;
        const { key } = context;
        return { key, errorMessage: message, }
    });

    return { errors };
};

exports.httpMethodNotSupported = (method) => {
    return `Request method ${method} not supported!`;
};
