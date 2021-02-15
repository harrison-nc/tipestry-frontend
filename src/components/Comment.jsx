import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigator } from '../hooks/useNavigator';
import { usePost } from '../hooks/usePosts';
import { UserData } from '../hooks/useUser';

export default function Comment(props) {
    const { isModal, ...rest } = props;
    const { postId } = useParams();
    const [value, setValue] = useState('');
    const navigator = useNavigator();
    const dispatch = usePost(postId)[1];
    const user = useContext(UserData);
    const ref = useRef();

    useEffect(() => {
        const { current } = ref;
        if (current) {
            current.focus();
        }
    });

    function handleCancel(e) {
        setValue('');
        if (isModal) navigator.goBack();
    }

    async function handleSend(e) {
        dispatch({ type: "ADD_COMMENT", comment: value, user })
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
        <div {...rest}>
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
