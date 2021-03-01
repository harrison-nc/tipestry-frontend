import React from 'react';

export const Header = ({ onClose }) => {
    return (
        <div className="header rows">
            <p className="title has-text-link">
                Login
            </p>
            <button className="close btn" type="button" onClick={onClose}>X</button>
        </div>
    );
};
