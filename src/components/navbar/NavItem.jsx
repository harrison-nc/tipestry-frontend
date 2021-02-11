import React from 'react';
import { Link } from 'react-router-dom';

export const NavItem = ({ link, children, rounded }) => {
    return (
        <>
            {rounded ?

                <Link className="nav__item px-3 has-shadow is-rounded is-white" to={link}>
                    {children}
                </Link>

                :

                <Link className="nav__item px-5 has-text-white" to={link}>
                    {children}
                </Link>
            }
        </>
    );
};
