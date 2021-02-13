import React, { useState } from 'react';
import FancyButton from '../../components/FancyButton';

export const Control = ({ isModal, onClear, onSubmit }) => {
    const ref = React.createRef();
    const [isSending, setIsSending] = useState(false);

    const handleSubmit = async (e) => {
        setIsSending(true);
        await onSubmit(e);
        setIsSending(false);
    };

    return (
        <div className="login__control is-flex mt-3">
            <input className="cancel btn is-white is-outlined" type="button" value="clear" disabled={isSending} onClick={onClear} />
            <FancyButton className="btn py-4 px-3 is-primary is-bold"
                ref={ref}
                text="Login"
                isSending={isSending}
                onClick={handleSubmit} />
        </div>
    );
};
