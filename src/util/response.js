
export const getResponseData = async (response) => {
    let data;

    try {
        data = await response.json();
    }
    catch (ex) {
        console.debug(ex);

        if (response.bodyUsed) throw ex;

        const text = await response.text();

        try {
            data = JSON.parse(text);
        }
        catch (ex) {
            data = {};
            console.error(ex);
            console.debug('# status text', response.statusText);
            console.debug('# response body text\n', text);
        }
    }

    return data;
};
