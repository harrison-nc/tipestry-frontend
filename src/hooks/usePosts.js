import { useEffect, useReducer } from 'react';

const getPostFunction = `${process.env.REACT_APP_POST_API}`;

export default function Post() {
    const [state, dispatch] = useReducer(postReducer, []);

    useEffect(() => {
        async function fetchPostData() {
            try {
                const response = await fetch(getPostFunction);
                let result = await response.json();

                if (response.ok) {
                    dispatch({ type: "INIT", posts: result.data });
                }
                else {
                    dispatch({ type: "INIT_FAILURE" });
                    console.debug('Failed to get posts', result, response);
                }

            } catch (ex) {
                console.debug(ex.message, ex);
            }
        }

        fetchPostData();

    }, []);

    return [state, dispatch];
};

const postReducer = (state, action) => {
    switch (action.type) {
        case 'INIT': {
            return [...action.posts];
        }
        case 'ADD_POST': {
            return [...state, action.post];
        }
        case "INIT_FAILURE": throw new Error('Failed to get posts from the server');
        default: throw new Error('Invalid action on post:', action.type);
    }
};
