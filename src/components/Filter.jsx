import React from 'react';

const Filter = () => {
    return (
        <div className="filter has-background-white py-3 px-3 box">
            <div className="control">
                <label>View</label>
                <button className="btn py-5 px-5">List</button>
                <button className="btn py-5 px-5">Preview</button>
            </div>

            <div className="control">
                <label className="" for="filter-1">Sort</label>
                <select id="filter-1">
                    <option>Popular</option>
                    <option>Recent</option>
                </select>
            </div>

            <div className="control left">
                <select className="">
                    <option>Now</option>
                    <option>Today</option>
                    <option>This Week</option>
                    <option>This Month</option>
                    <option>All Time</option>
                </select>
            </div>
        </div>
    );
}

export default Filter;
