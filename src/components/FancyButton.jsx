import React, { forwardRef, useEffect, useState } from "react";

const FancyButton = forwardRef((props, ref) => {
    const { isSending, onClick, text, ...rest } = props;
    const [value, setValue] = useState(text);

    useEffect(() => {
        if (isSending && ref.current) {
            const node = ref.current;
            let newText = text;
            setValue('');

            const id = setInterval(() => {
                if (newText === text) newText = '.';
                else if (newText === '. . . .') newText = '.';
                else newText += ' .';

                node.innerHTML = newText;

            }, 500);

            return () => {
                clearInterval(id);
                setValue(text);
            };
        }

    }, [isSending, ref, text]);

    return (
        <button ref={ref} {...rest} onClick={onClick}>
            {value}
        </button>
    );
});

export default FancyButton;
