import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigator } from '../hooks/useNavigator';

export default function Comment(props) {
    const ref = useRef();
    const navigator = useNavigator();
    const { postId } = useParams();
    const [value, setValue] = useState('');
    const { id, isModal, onSend, ...passThrough } = props;

    useEffect(() => {
        const { current } = ref;
        if (current) {
            current.focus();
        }
    });

    function handleCancel(e) {
        setValue('');
        navigator.goBack();
    }

    async function handleSend(e) {
        e.target.value = value;
        e.target.postId = postId;

        const result = await onSend(e);

        if (result) {
            console.debug(result);
        }

        handleCancel(e);
    }

    function handleChange(e) {
        const { value } = e.target;
        setValue(value);
    }

    function handleBlur(e) {
        if (value) setValue(value.trim());
    }

    return (
        <div id={id} {...passThrough}>
            <h1>Comment</h1>

            <textarea ref={ref} className="size-medium px-5 py-5"
                placeholder="Enter comment"
                name="comment"
                cols='30'
                rows='5'
                value={value}
                onBlur={handleBlur}
                onChange={handleChange} />

            <div className="control is-flex">
                <button className="btn py-4 px-3 is-white is-outlined" onClick={handleCancel}>
                    Cancel
                </button>

                <button className="btn py-4 px-3 is-link" onClick={handleSend}>
                    Send
                </button>
            </div>
        </div>
    );
}
