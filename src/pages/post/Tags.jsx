export const Tags = (props) => {
    const { values, onRemove } = props;

    return (
        <ul className="post__tags is-flex">
            {values.map((item, i) => <li key={i} className="tag__item">
                <span className="tag__item__hash">#</span>
                <span className="tag__item__text">{item}</span>
                <span className="tag__item__btn" onClick={() => onRemove(item)}>x</span>
            </li>)}
        </ul>
    );
};

export const TagInput = (props) => {
    const { value, onAdd, onChange, hasError, ...rest } = props;

    return (
        <fieldset className="tag__control py-6 px-6 field">
            <legend className="legend">Tags</legend>
            <div className="is-flex mt-3">
                <input className="tag__input input flex-grow py-4 px-4" type="text" name="tagName" placeholder="Enter tag name" {...rest} value={value} onChange={onChange} />
                <button type="button" onClick={onAdd}>Add</button>
            </div>
        </fieldset>
    );
};
