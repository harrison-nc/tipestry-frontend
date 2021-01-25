import React, { useState } from 'react';

import Modal from '../modal/Modal';

const Comment = (props) => {
    const { id, onSend, ...passThrough } = props;
    const [value, setValue] = useState('');

    function handleCancel(e) {
        setValue('');
    }

    async function handleSend(e) {
        e.target.value = value;
        await onSend(e);
        setValue('');
    }

    function handleChange(e) {
        const { value } = e.target.value;
        setValue(value);
    }

    function handleBlur(e) {
        setValue(value.trim());
    }

    return (
        <Modal id={id}>
            <div className="comment box has-background-white py-3 px-2" {...passThrough}>
                <h1>Comment</h1>
                <textarea name="comment" value={value} onBlur={handleBlur} onChange={handleChange} cols='30' rows='5'></textarea>
                <div className="control is-flex mt-4">
                    <button className="btn py-4 px-3 is-white is-outlined" onClick={handleCancel}>Cancel</button>
                    <button className="btn py-4 px-3 is-link" onClick={handleSend}>Send</button>
                </div>
            </div>
        </Modal>
    );
}

export default Comment;
