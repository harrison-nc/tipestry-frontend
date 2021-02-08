const fs = require('fs/promises');
const Response = require('../util/response');
const { parseJoiError } = require('../util/error');
const { connect, close } = require('../util/database');
const { Post, validate } = require('../util/model/post');
const { uploadFile } = require("./file");

exports.handler = async function (event) {
    if (event.httpMethod !== 'POST') {
        return Response.of(new Error(`Request method ${event.httpMethod} not supported`));
    }

    const bodyParams = new URLSearchParams(event.body);
    const body = Object.fromEntries(bodyParams);
    let path;

    try {
        path = await uploadFile(body.file);
    }
    catch (ex) {
        console.debug(ex);
        return Response.of(new Error('Unable to upload file'));
    }

    try {
        await addPost(body, path);
        return Response.of([]);
    }
    catch (ex) {
        try {
            fs.rm(path);
        }
        catch (ex) {
            console.debug(ex);
        }

        try {
            close();
        }
        catch (ex) {
            console.debug(ex);
        }

        console.debug(ex);
        return Response.of(new Error('Unable to create post'));
    }
}

const addPost = async (body, path) => {
    let { title, description, tags } = body;
    tags = tags ? tags.split(',') : [];

    const post = {
        title,
        description,
        resourceUrl: path,
        tags,
    };

    const { error } = validate(post);

    if (error) throw new Error(parseJoiError(error));

    try {
        await connect();
    } catch (ex) {
        console.debug(ex);
        throw new Error('Unable to connect to database');
    }

    try {
        return Post.newPost(post);
    }
    catch (ex) {
        console.debug(ex);
        throw new Error('Unable to create post');
    }
};
