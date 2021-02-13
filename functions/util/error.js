exports.parseJoiError = (error) => {
    const { details } = error;

    const errors = details.map((d) => {
        const { context, message } = d;
        const { key, value } = context;

        return {
            key,
            [key]: value,
            message,
        }
    });

    return JSON.stringify({ errors });
};
