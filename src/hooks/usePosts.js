import { useEffect, useState } from 'react';
import { getPostFunction } from "../startup/startup";

export default function usePosts(owner) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function fetchPostData() {
            try {
                const response = await fetch(getPostFunction);
                let result = await response.json();

                if (response.ok) setPosts(result.data);

                else console.debug('Failed to get posts', result, response);

            } catch (ex) {
                console.debug(ex.message, ex);
            }
        }

        fetchPostData();

    }, [owner]);

    return [posts, setPosts];
};
