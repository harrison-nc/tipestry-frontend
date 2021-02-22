import FancyButton from '../../components/FancyButton';

export const Control = ({ onClear, isSending, isDisabled }) => {
    return (
        <div className="post__control rows right-control mt-2">
            <button className="btn cancel is-white is-outlined" type="button" onClick={onClear}>
                clear
            </button>

            <FancyButton
                className="btn is-primary py-4 px-3 is-bold"
                text="Post"
                type="submit"
                disabled={isSending || isDisabled}
                isSending={isSending} />
        </div>
    );
};
