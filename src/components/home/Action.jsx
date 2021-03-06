import { actions } from '../../util/post-util';

export default function Action({ filter, sort, onChange }) {
    return (
        <div className="filter has-background-white box py-4 px-3">
            <div className="filter__control">
                <label>View</label>
                <button className="btn py-5 px-5">List</button>
                <button className="btn py-5 px-5">Preview</button>
            </div>

            <div className="filter__control">
                <label>Sort</label>
                <select name="sort" value={sort} onChange={onChange} >
                    {!sort && <option value=""></option>}
                    {getSortingOptions()}
                </select>
            </div>

            <div className="filter__control left">
                <select name="filter" value={filter} onChange={onChange}>
                    {!filter && <option value=""></option>}
                    {getFilteringOptions()}
                </select>
            </div>
        </div>
    );
}
function getFilteringOptions() {
    return actions.filters.map(action => <option key={action.name} value={action.name}>
        {action.value}
    </option>
    );
}

function getSortingOptions() {
    return actions.sorts.map(action => <option key={action.name} value={action.name}>
        {action.value}
    </option>
    );
}

