const send = data => {
    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type,Accept"
        },
        body: JSON.stringify(data)
    }
};

const error = (message) => {
    return {
        statusCode: 400,
        body: JSON.stringify({ error: message })
    }
};

module.exports = {
    send,
    error
};
