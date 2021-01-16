function Filter() {
    return (
        <div>
            <label> View
             <button>List</button>
            </label>
            <button>Preview</button>
            <label>Sort
             <select>
                    <option>Popular</option>
                    <option>Recent</option>
                </select>
            </label>
            <select>
                <option>Now</option>
                <option>Today</option>
                <option>This Week</option>
                <option>This Month</option>
                <option>All Time</option>
            </select>
        </div>
    );
}

export default Filter;
