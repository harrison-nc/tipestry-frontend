import React, { useState } from 'react';
import FancyButton from '../FancyButton';
import { useBackgroundNavigator } from '../../hooks/useBackgroundNavigator';

export const Control = (props) => {
    const { isModal, onClear, onSubmit } = props;
    const ref = React.createRef();

    const [isSending, setIsSending] = useState(false);
    const navigator = useBackgroundNavigator(isModal);

    const handleSubmit = async (e) => {
        setIsSending(true);
        await onSubmit(e);
        setIsSending(false);
        navigator.goBack();
    };

    return (
        <div className="register__control is-flex mt-3">
            <input className="btn cancel is-white is-outlined is-bold" type="button" value="clear" onClick={onClear} disabled={isSending} />
            <FancyButton className="is-primary btn is-bold"
                text="Register"
                ref={ref}
                isSending={isSending}
                onClick={handleSubmit} />
        </div>
    );
};
