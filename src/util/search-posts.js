const getPostFunction = `${process.env.REACT_APP_POST_API}`;

export const findPostsMatchingQuery = async (query) => {
    const endPoint = `${getPostFunction}?q=${query}`;

    try {
        const response = await fetch(endPoint, {
            method: 'GET',
            mode: 'cors'
        });

        if (!Number(response.status) === 200) return [];

        return await response.json();
    }
    catch (ex) {
        console.error(ex);
    }

    return [];
};
