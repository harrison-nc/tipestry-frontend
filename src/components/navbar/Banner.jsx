import React from 'react';
import { NavItem } from "./NavItem";

export const Banner = ({ children }) => {
    return (
        <div className="nav__brand">
            <span className="title">
                <NavItem link="/">{children}</NavItem>
            </span>
        </div>
    );
};
