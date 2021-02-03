import React from 'react';
import { createPortal } from 'react-dom';

export default function Modal(props) {
    const { id, children, className } = props;
    const addClassName = className ? className : '';

    return createPortal(
        <div id={id} className={"modal " + addClassName}>
            {children}
        </div>
        , document.getElementById('modal-root'));
}

export function createDialog(attrs) {
    const { id, type, text, ...restAttrs } = attrs;

    return (props) => {
        return (
            <Modal id={id} {...restAttrs} {...props}>
                <div className={type + " box is-flex flex-column has-background-white py-3 px-3"}>
                    <p className="is-flex subtitle">
                        {text}
                    </p>
                    <a className="modal-close close" alt="close modal" href="#app">Close</a>
                </div>
            </Modal>
        );
    };
};

