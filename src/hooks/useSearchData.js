import { useEffect, useRef, useState } from 'react';
import { getPostFunction } from '../startup/startup';
import { useQuery } from './useQuery';

export const useSearchData = (posts) => {
    const query = useQuery();
    const matchRef = useRef();
    const [match, setMatch] = useState([]);

    useEffect(() => {
        matchRef.current = match;
    }, [match])

    useEffect(() => {
        async function findPost() {
            const match = await findPostsMatchingQuery(query);
            setMatch(match);
        }

        findPost();

    }, [query]);

    useEffect(() => {
        if (!matchRef.current || matchRef.current.length === 0) return;
        if (!(posts instanceof Array)) return;

        const update = posts.filter(a => matchRef.current.find(b => b._id === a._id));
        setMatch(value => [...value, ...update]);

    }, [posts]);

    return [match, setMatch];
};

const findPostsMatchingQuery = async (query) => {
    const endPoint = `${getPostFunction}?q=${query}`;

    try {
        const response = await fetch(endPoint, {
            method: 'GET',
            mode: 'cors'
        });

        if (!Number(response.status) === 200) return [];

        const result = await response.json();

        return result.data;
    }
    catch (ex) {
        console.error(ex);
    }

    return [];
};
