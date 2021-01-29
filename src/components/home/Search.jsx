import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Search = () => {
    const [query, setQuery] = useState('');

    function handleChange(e) {
        const { value } = e.target;
        setQuery(value)
    }

    function handleBlur(e) {
        const { value } = e.target;
        if (value) setQuery(value.trim());
    }

    function handleSearch(e) {
        if (!query) e.preventDefault();
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
            <Link className="home__search__btn py-5 px-5"
                onClick={handleSearch}
                to={{
                    pathname: '/search',
                    search: `?q=${query}`
                }}>
                Load
            </Link>
        </div>
    );
};
