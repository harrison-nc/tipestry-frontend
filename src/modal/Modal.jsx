import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function Modal(props) {
    const { id, children, className, component } = props;
    const addClassName = className ? className : '';

    useEffect(() => {
        const root = document.querySelector('body');
        root.classList.add('overflow-hidden');
        return () => root.classList.remove('overflow-hidden');
    }, []);

    return createPortal(
        <div id={id} className={"modal " + addClassName}>
            {children && children}
            {!children && component({ isModal: true })}
        </div>
        , document.getElementById('modal-root')
    );
}

export function createDialog(attrs) {
    const { id, type, text, ...rest } = attrs;

    return (props) => {
        return (
            <Modal id={id} {...rest} {...props}>
                <div className={type + " box columns has-background-white py-3 px-3"}>
                    <p className="rows subtitle">
                        {text}
                    </p>
                    <a className="modal-close close" alt="close modal" href="#app">Close</a>
                </div>
            </Modal>
        );
    };
};
