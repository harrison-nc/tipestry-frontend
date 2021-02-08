const path = require('path');
const fs = require('fs/promises');
const fsConstants = require('fs').constants;
const { createBufferFromDataURL } = require('../util/buffer');

const uploadDir = process.env.IMAGE_DIR;

if (!uploadDir) throw new Error('upload directory not provided')

exports.uploadFile = async (fileData) => {
    const file = JSON.parse(fileData);
    const { name: filename, data } = file;

    if (!file || !file.data)
        throw new Error('Upload file not provided');

    const { buffer } = createBufferFromDataURL(data);

    try {
        await checkUploadDirAccess();
    } catch (error) {
        throw error;
    }

    const ext = path.extname(filename);
    const encodedFilename = Buffer.from(filename).toString('base64');
    const finalFilename = `${uploadDir}/${encodedFilename}${Date.now()}${ext}`;

    try {
        await fs.writeFile(finalFilename, buffer);
        return finalFilename;
    }
    catch (ex) {
        console.debug(ex);
        throw new Error('Could not upload file');
    }
};

const checkUploadDirAccess = async () => {
    try {
        await fs.access(uploadDir, fsConstants.F_OK);
    }
    catch (ex) {
        console.debug(ex);
        await createUploadDir();
    }

    try {
        await fs.access(uploadDir, fsConstants.W_OK);
    }
    catch (ex) {
        console.debug(ex);
        throw new Error('Unable to write to upload directory');
    }

    try {
        await fs.access(uploadDir, fsConstants.R_OK);
    }
    catch (ex) {
        console.debug(ex);
        throw new Error('Cannot read from upload directory');
    }
};

const createUploadDir = async () => {
    try {
        await fs.mkdir(uploadDir, { recursive: true });
    }
    catch (ex) {
        console.error(ex);
        throw new Error('Unable to create upload directory');
    }
};
