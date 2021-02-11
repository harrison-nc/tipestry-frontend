import React from 'react';
import { NavItem } from './NavItem';
import { User } from './User';
import { useLinks } from "./hooks/useLinks";

export const NavItems = ({ user }) => {
    const links = useLinks();

    return (
        <nav className="nav__items is-flex">
            {user &&
                <>
                    <User user={user} />
                    <Line />
                </>
            }

            <NavItem link={links.post}>Post</NavItem>

            {!user &&
                <>
                    <NavItem link={links.login}>Login</NavItem>
                    <NavItem link={links.register} rounded={true}>Join Us</NavItem>
                </>
            }

            <button className="nav__btn btn px-5 is-outlined is-white">en</button>
        </nav>
    );
};

const Line = () => {
    const style = { maxWidth: '2px', width: "1px", maxHeight: '100%' };
    return (<span className="has-background-grey" style={style}></span>);
};
