import React, { useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';

const Comment = (props) => {
    const location = useLocation();
    const history = useHistory();
    const { postId } = useParams();
    const [value, setValue] = useState('');

    const { id, isModal, onSend, ...passThrough } = props;
    const background = location.state && location.state.background;

    function handleCancel(e) {
        setValue('');
        if (isModal && background) history.replace(background.pathname, location.state);
        // else history.goBack();
    }

    async function handleSend(e) {
        e.target.value = value;
        e.target.postId = postId;
        onSend(e);
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

            <textarea className="size-medium px-5 py-5"
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


export default Comment;
