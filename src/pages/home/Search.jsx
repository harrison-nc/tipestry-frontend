import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import searchIcon from "../../assets/icons/search-icon.svg";

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
            <label className="label" htmlFor="query">
                <img src={searchIcon} alt="Search icon" style={{ height: "20px" }} />
            </label>
            <input id="query" className="input flex-grow"
                name="query"
                type="text"
                value={query}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter a URL or a Search" />
            <button className="home__search__btn py-5 px-5"
                onClick={handleSearch}>
                <span className="text">Load</span>
                <span className="icon">
                    <img src={searchIcon} alt="search icon" />
                </span>
            </button>
        </div>
    );
};
