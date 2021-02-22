import React from 'react';

export const Header = ({ onClose }) => {
    return (
        <div className="header rows">
            <p className="title has-text-link">
                Register user
            </p>
            <button className="close btn" onClick={onClose}>X</button>
        </div>
    );
};
