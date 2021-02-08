exports.handler = (event) => {
    console.log('payload', event.payload);
    return {
        statusCode: 204
    };
}
