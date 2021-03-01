import { useState, useRef, useEffect } from "react";

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

export const TagInput = ({ onAdd, isDisabled }) => {
    const ref = useRef();
    const [value, setValue] = useState('');

    useEffect(() => {
        if (!ref.current) return;

        function handleEnterPress(event) {
            if (event.code === 'Enter') {
                event.preventDefault();
                onAdd(event.target.value);
                setValue('');
            }
        }

        const eventType = 'keydown';
        const element = ref.current;
        element.addEventListener(eventType, handleEnterPress);
        return () => element.removeEventListener(eventType, handleEnterPress);
    }, [onAdd]);

    function handleChange(event) {
        setValue(event.target.value);
    }

    function handleAdd(value) {
        onAdd(value);
        setValue('');
    }

    return (
        <div className="tag__control rows mt-3">
            <input ref={ref}
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
                onClick={() => handleAdd(value)}>+</button>
        </div>
    );
};
