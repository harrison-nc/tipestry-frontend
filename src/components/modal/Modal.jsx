import '../../css/modal.css';
import React from 'react';

export default function Modal(props) {
    const { id, children, classes } = props;
    return (
        <div id={id} className={"modal-window " + classes}>
            {children}
        </div>
    );
}

export const FormModal = (props) => {
    const { id, children, method, onReset, onSubmit, title, close, classes } = props;

    return (
        <div id={id} className={"modal-window " + classes}>
            <form method={method}
                onReset={onReset}
                onSubmit={onSubmit}
                noValidate={true}>

                <div className="form is-flex flex-column box has-background-white pt-2 pb-4 px-2">
                    <div className="header is-flex">
                        <p className="subtitle has-color-link flex-grow mb-4">
                            {title}
                        </p>
                        {close}
                    </div>
                    {children}
                </div>
            </form>
        </div>
    );
}

export function createModal(attrs) {
    const { id, type, text } = attrs;

    return (props) => {
        return (
            <Modal id={id}>
                <div
                    className={type + " box is-flex flex-column has-background-white py-3 px-3"}>
                    <p className="is-flex subtitle">
                        {text}
                    </p>
                    <a className="modal-close close" alt="close modal" href="#app">Close</a>
                </div>
            </Modal>
        );
    };
};

