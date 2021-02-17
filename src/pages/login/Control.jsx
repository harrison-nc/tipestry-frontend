import React from 'react';
import FancyButton from '../../components/FancyButton';

export const Control = ({ onClear, isSending, isDisabled }) => {
    return (
        <div className="login__control is-flex mt-3">
            <input
                className="cancel btn is-white is-outlined"
                type="button"
                value="clear"
                disabled={isSending}
                onClick={onClear} />

            <FancyButton
                className="btn py-4 px-3 is-primary is-bold"
                type="submit"
                text="Login"
                isDisabled={isDisabled}
                isSending={isSending} />
        </div>
    );
};
