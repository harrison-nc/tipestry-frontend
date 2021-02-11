import { useEffect } from 'react';
import { getPostFunction } from "../startup/startup";

export const usePostData = (consumer) => {
    useEffect(() => {
        async function fetchPostData() {
            try {
                const response = await fetch(getPostFunction);
                let posts = await response.json();
                consumer(posts);
            } catch (ex) {
                console.error(ex.message, ex);
            }
        }
        fetchPostData();

    }, [consumer]);
};
