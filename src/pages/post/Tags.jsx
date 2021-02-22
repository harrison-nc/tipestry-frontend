import { useState } from "react";

export const Tags = (props) => {
    const { value, onRemove } = props;

    return (
        <ul className="post__tags rows">
            {value.map((item, i) =>
                <li key={i} className="tag__item">
                    <span className="tag__item__hash">#</span>
                    <span className="tag__item__text">{item}</span>
                    <span className="tag__item__btn" onClick={() => onRemove(item)}>x</span>
                </li>)
            }
        </ul>
    );
};

export const TagInput = (props) => {
    const { onAdd, isDisabled } = props;
    const [value, setValue] = useState('');

    function handleChange(event) {
        setValue(event.target.value);
    }

    function handleAdd(event) {
        onAdd(value);
        setValue('');
    }

    return (
        <div className="tag__control rows mt-3">
            <input
                className="tag__input input flex-grow py-4 px-4"
                type="text"
                name="tagName"
                placeholder="Enter tag name"
                value={value}
                onChange={handleChange}
                disabled={isDisabled} />

            <button
                disabled={isDisabled}
                className="btn is-primary"
                type="button"
                onClick={handleAdd}>+</button>
        </div>
    );
};
