import React from 'react';

const Search = () => {
    return (
        <div className="search">
            <form>
                <label>Search
                    <input name="query" type="text" placeholder="Enter a URL or a Search" />
                </label>
                <input type="submit" value="load" />
            </form>
        </div>
    );
}

export default Search;
