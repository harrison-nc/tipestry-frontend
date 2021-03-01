import { actions } from '../../util/post-util';
import Suggestions from './Suggestions';
import listviewIcon from '../../assets/icons/listview-icon.svg';
import detailviewIcon from '../../assets/icons/detailview-icon.svg';

export default function Action({ filter, sort, onChange, onViewChange }) {
    return (
        <div className="filter__container">
            <div className="filter rows has-background-white box py-4 px-3">
                <div className="filter__control">
                    <label className="label">View</label>
                    <button name="list" className="list btn" onClick={onViewChange}>
                        <Icon src={listviewIcon} name="list" />
                    </button>
                    <button name="detail" className="detail btn" onClick={onViewChange}>
                        <Icon src={detailviewIcon} name="detail" />
                    </button>
                </div>

                <div className="filter__control rows">
                    <label className="label">Sort</label>
                    <select className="select" name="sort" value={sort} onChange={onChange} >
                        {!sort && <option value=""></option>}
                        {getSortingOptions()}
                    </select>
                    <select className="select" name="filter" value={filter} onChange={onChange}>
                        {!filter && <option value=""></option>}
                        {getFilteringOptions()}
                    </select>
                </div>
            </div>

            <Suggestions className="filter__aside" />
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

function Icon({ src, name }) {
    return (
        <img className="icon" src={src} name={name} alt={`${name} icon`} />
    );
}
