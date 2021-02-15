import React, { forwardRef, useEffect } from "react";

const FancyButton = forwardRef((props, ref) => {
    const { isSending, text, ...rest } = props;

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

    }, [isSending, ref, text]);

    return (
        <button ref={ref} {...rest}>
            {text}
        </button>
    );
});

export default FancyButton;
