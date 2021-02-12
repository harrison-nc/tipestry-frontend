import { useEffect, useState } from 'react';
import { getPostFunction } from "../startup/startup";

export default function usePosts(owner) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function fetchPostData() {
            try {
                const response = await fetch(getPostFunction);
                let posts = await response.json();

                if (response.ok) setPosts(posts);
                else console.debug('Failed to get posts');

            } catch (ex) {
                console.error(ex.message, ex);
            }
        }

        fetchPostData();

    }, [owner]);

    return [posts, setPosts];
};
