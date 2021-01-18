import React from 'react';

const Search = () => {
    return (
        <form>
            <div className="search has-background-white py-3 px-3 box">
                <div className="control">
                    <label for="query">Search</label>
                    <input className="input flex-grow"
                        id="query"
                        name="query"
                        type="text"
                        placeholder="Enter a URL or a Search" />
                </div>
                <input className="btn py-5 px-5" type="submit" value="load" />
            </div>
        </form>
    );
}

export default Search;
