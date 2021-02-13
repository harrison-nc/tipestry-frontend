const axios = require('axios');
const Response = require('../util/response');
const { getImageData, parseResponse, parseResult } = require("./util/helper");

const serverURL = process.env.IMAGE_SERVER_URL;
const apiKey = process.env.IMAGE_SERVER_KEY;

if (!serverURL || !apiKey)
    throw new Error('Server api key and url is required');

const request = axios.create({
    timeout: 5000,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
});

exports.handler = async (event) => {
    const params = new URLSearchParams(event.body);
    const body = Object.fromEntries(params);

    const { image, name } = body;

    const data = getImageData(image);

    const form = { append: (key, value) => form[key] = value };
    form.append('image', data);
    form.append('name', name || 'uploadimage');
    form.append('key', apiKey);

    const encodedData = new URLSearchParams(form).toString();
    try {
        const response = await request.post(serverURL, encodedData);
        const result = parseResponse(response);
        const urls = parseResult(result);

        return Response.of({ file: urls });
    }
    catch (ex) {
        return Response.ofError({ errorMessage: "Failed to upload file" }, { status: 500 });
    }
};
