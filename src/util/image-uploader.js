const uploadFunction = process.env.REACT_APP_UPLOAD_API;

export default async function uploadImage(file) {
    const data = await getImageData(file);
    const form = new FormData();
    form.append('image', data);
    form.append('name', file.name);
    const encodedData = new URLSearchParams(form).toString();

    console.log('# upload data         =====>\n', data);
    console.log('# upload encodedData  =====>\n', encodedData);

    const response = await fetch(uploadFunction, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Aceept: 'application/json'
        },
        body: encodedData
    });

    return parseResponse(response);
};

const getImageData = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = (event) => resolve(reader.result);
        reader.onerror = (event) => reject(reader.result);
        reader.readAsDataURL(file);
    });
};

const parseResponse = (response) => {
    if (!response.ok)
        throw new Error('File upload failed');

    return response.json();
};
