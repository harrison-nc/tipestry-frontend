import React from 'react';
import { NavItem } from "./NavItem";

export const Brand = ({ children }) => {
    return (
        <div className="nav__brand is-flex">
            <LineMenu />
            <span className="title">
                <NavItem link="/">{children}</NavItem>
            </span>
        </div>
    );
};

const LineMenu = () => {
    function handleClick(event) {

    }

    return (
        <div className="line-menu mt-6 mr-6" onClick={handleClick}>
            <p className="menu__item"></p>
            <p className="menu__item"></p>
            <p className="menu__item"></p>
        </div>
    );
};
