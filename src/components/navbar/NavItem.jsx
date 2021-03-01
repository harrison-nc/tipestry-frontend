import React from 'react';
import { Link } from 'react-router-dom';

export const NavItem = ({ link, children, rounded, keep }) => {
    let className = rounded
        ? "nav__item px-3 has-shadow is-rounded is-white"
        : "nav__item px-6 has-text-white";

    if (keep) className = `${className} nav__item__keep`;

    return (
        <>
            {rounded ?

                <Link className={className} to={link}>
                    {children}
                </Link>

                :

                <Link className={className} to={link}>
                    {children}
                </Link>
            }
        </>
    );
};
