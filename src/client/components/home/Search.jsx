import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { findPostsMatchingQuery } from '../../App';

export const Search = () => {
    const history = useHistory();
    const [query, setQuery] = useState('');

    function handleChange(e) {
        const { value } = e.target;
        setQuery(value)
    }

    function handleBlur(e) {
        const { value } = e.target;
        if (value) setQuery(value.trim());
    }

    async function handleSearch(e) {
        if (!query) return e.preventDefault();
        const matchingPosts = await findPostsMatchingQuery(query);
        history.push(`/search?q=${query}`, { posts: JSON.stringify(matchingPosts) });
    }

    return (
        <div className="home__search has-background-white py-4 px-3 box">
            <div className="home__search__control">
                <label htmlFor="query">Search</label>
                <input className="input flex-grow"
                    name="query"
                    type="text"
                    value={query}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter a URL or a Search" />
            </div>
            <button className="home__search__btn py-5 px-5"
                onClick={handleSearch}>
                Load
            </button>
        </div>
    );
};
