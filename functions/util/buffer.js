exports.createBufferFromDataURL = (dataURI) => {
    // convert base64/URLEncoded data component to raw binary data held in a string

    const dataArray = dataURI.split(',');
    const urlData = dataArray[0];
    const encodedData = dataArray[1];

    let byteString;

    if (urlData.indexOf('base64') >= 0)
        byteString = encodedData;
    else
        throw new Error('Required base64 encoded data');

    // separate out the mime component
    let mimeType = urlData.split(':')[1].split(';')[0];

    const buffer = Buffer.from(byteString, 'base64');

    return {
        buffer,
        mimeType,
    }
}
