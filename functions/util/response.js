const of = data => {
    if (data instanceof Error) {
        console.debug(data);

        return {
            statusCode: 400,
            body: JSON.stringify({ error: data.message })
        }
    }
    else {
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type,Accept"
            },
            body: JSON.stringify(data)
        }
    }
};

module.exports = { of };