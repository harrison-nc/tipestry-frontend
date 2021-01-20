import '../css/modal.css';

import React from 'react';

const Modal = (props) => {
    const { id, children } = props;
    return (
        <div id={id} className="modal-window">
            {children}
        </div>
    );
}

export const FormModal = (props) => {
    const { id, children, method, onReset, onSubmit, title, noClose } = props;

    return (
        <div id={id} className="modal-window">
            <form method={method} onReset={onReset} onSubmit={onSubmit} noValidate={true}>
                <div className="form is-flex flex-column box has-background-white pt-2 pb-4 px-2">
                    <div>
                        <p className="subtitle has-color-link flex-grow mb-2">
                            {title}
                        </p>
                        {noClose ? <input className="close modal-close has-color-black" type="reset" value="Close" />
                            : ""}
                    </div>
                    {children}
                </div>
            </form>
        </div>
    );
}

export default Modal;
