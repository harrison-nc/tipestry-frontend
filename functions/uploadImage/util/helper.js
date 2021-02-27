const getImageData = (dataURL) => {
    const dataArray = dataURL.split(',');
    const urlData = dataArray[0];
    const encodedData = dataArray[1];

    let base64String;

    if (urlData.indexOf('base64') >= 0)
        base64String = encodedData;

    else
        throw new Error('Required base64 encoded data');

    return base64String;
};

const parseResponse = (response) => {
    const data = response.data;

    if (!data.success) {
        throw new Error('Request failed');
    }

    return data;
};

const parseResult = (result) => {
    const { data } = result;

    if (!data) error(result, 'data')

    const { image, delete_url } = data;

    if (!image) error(result, 'image');

    const { url } = image;

    if (!url) error(result, 'url');

    return { url, delete_url };
};

const error = (data, key) => {
    console.error(data);
    throw new Error(`Unsupported API Response object: "${key}" property not provided`);
};

exports.getImageData = getImageData;
exports.parseResponse = parseResponse;
exports.parseResult = parseResult;
