import { createRef, useState } from 'react';
import FancyButton from '../../components/FancyButton';

export const Control = ({ isModal, onClear, onSubmit }) => {
    const ref = createRef();
    const [isSending, setIsSending] = useState(false);

    const handleSubmit = async (e) => {
        setIsSending(true);
        await onSubmit(e);
        setIsSending(false);
    };

    return (
        <div className="post__control is-flex right-control mt-2">
            <button className="btn cancel is-white is-outlined" type="button" onClick={onClear}>
                clear
            </button>
            <FancyButton className="btn is-primary py-4 px-3 is-bold"
                text="Post"
                ref={ref}
                isSending={isSending}
                onClick={handleSubmit} />
        </div>
    );
};
