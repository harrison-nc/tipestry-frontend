import React from 'react';

export const Search = () => {
    return (
        <form>
            <div className="home__search has-background-white py-4 px-4 box">
                <div className="home__search__control">
                    <label htmlFor="query">Search</label>
                    <input className="input flex-grow"
                        id="query"
                        name="query"
                        type="text"
                        placeholder="Enter a URL or a Search" />
                </div>
                <input className="home__search__btn py-5 px-5" type="submit" value="load" />
            </div>
        </form>
    );
};
