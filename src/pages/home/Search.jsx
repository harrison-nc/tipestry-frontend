import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

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
        history.push(`/search?q=${query}`);
    }

    return (
        <div className="home__search has-background-white py-4 px-3 box">
            <label className="label" htmlFor="query">Search</label>
            <input id="query" className="input flex-grow"
                name="query"
                type="text"
                value={query}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter a URL or a Search" />
            <button className="home__search__btn py-5 px-5"
                onClick={handleSearch}>
                Load
            </button>
        </div>
    );
};
