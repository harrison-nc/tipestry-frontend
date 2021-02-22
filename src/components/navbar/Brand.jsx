import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { NavItem } from "./NavItem";

export const Brand = ({ children }) => {
    return (
        <div className="nav__brand rows">
            <LineMenu />
            <span className="title">
                <NavItem link="/">{children}</NavItem>
            </span>
        </div>
    );
};

const LineMenu = () => {
    const location = useLocation();
    const history = useHistory();

    function handleClick(event) {
        history.push('/banner', { background: location });
    }

    return (
        <div className="line-menu mt-6 mr-6" onClick={handleClick}>
            <p className="menu__item"></p>
            <p className="menu__item"></p>
            <p className="menu__item"></p>
        </div>
    );
};
