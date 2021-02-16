import React from 'react';
import FancyButton from '../../components/FancyButton';

export const Control = ({ onClear, isSending }) => {
    return (
        <div className="register__control is-flex mt-3">
            <input
                className="btn cancel is-white is-outlined is-bold"
                type="button"
                value="clear"
                onClick={onClear}
                disabled={isSending} />

            <FancyButton
                className="is-primary btn is-bold"
                text="Register"
                type="submit"
                isSending={isSending} />
        </div>
    );
};
