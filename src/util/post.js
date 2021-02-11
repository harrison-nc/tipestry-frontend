import { getResponseData } from './response';
import { addPostFunction } from '../startup/startup';

export const createPost = async (user, posts, data, consumer) => {
    try {
        const encodedString = new URLSearchParams(data).toString();

        const response = await fetch(addPostFunction, {
            method: 'POST',
            mode: 'cors',
            headers: getPostHeaders(user),
            body: encodedString,
        });

        const result = await parsePostResponse(response);

        parsePostResult(result, {
            posts,
            consumer
        });

        return result;

    } catch (ex) {
        console.error(ex);
        throw ex;
    }
};

const addPost = (posts, post, consumer) => {
    const array = [...posts];
    array.push(post);
    consumer(array);
};

const getPostHeaders = (user) => {
    const headers = {
        Accept: 'application/json',
        'Content-Type': "application/x-www-form-urlencoded"
    };

    if (user)
        headers['x-auth-token'] = user['token'];
};

const parsePostResponse = async (response) => {
    if (!response.ok) {
        const data = await getResponseData(response);

        if (data && data.error) {
            return { succeeded: false, error: data.error };
        }

        console.debug('# error:', data);
        console.debug(response.statusText);
        throw new Error('Invalid server response', response);
    }

    const data = await getResponseData(response);
    return { succeeded: true, data };
};

const parsePostResult = (result, props) => {
    if (result.succeeded) {
        const { data } = result;
        const { posts, consumer } = props;
        addPost(posts, data, consumer);
    }
};
