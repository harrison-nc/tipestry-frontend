import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const useQuery = () => {
    const location = useLocation();
    const [query, setQuery] = useState('');

    useEffect(() => {
        console.debug('# getting query...');

        const search = new URLSearchParams(location.search);
        setQuery(search.get('q'));

    }, [location]);

    return query;
};
