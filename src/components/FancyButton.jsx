import React, { useEffect, useRef } from "react";

const FancyButton = (props) => {
    const { isSending, isDisabled, text, ...rest } = props;
    const ref = useRef();

    useEffect(() => {
        if (isSending && ref.current) {
            const node = ref.current;
            let newText = text;

            const id = setInterval(() => {
                if (newText === text) newText = '.';
                else if (newText === '. . . .') newText = '.';
                else newText += ' .';

                node.innerHTML = newText;

            }, 500);

            return () => {
                clearInterval(id);
                node.innerHTML = text;
            };
        }

    }, [isSending, text]);

    return (
        <button ref={ref} {...rest} disabled={isSending || isDisabled}>
            {text}
        </button>
    );
};

export default FancyButton;
