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

            <NavItem link={links.post} keep={true}>Post</NavItem>

            {!user &&
                <>
                    <NavItem link={links.login}>Login</NavItem>
                    <NavItem link={links.register} rounded={true}>Join Us</NavItem>
                </>
            }

            <div className="is-flex">
                <button className="nav__btn btn px-5 is-outlined is-white">en</button>
                <RoundMenu />
            </div>
        </nav>
    );
};

const RoundMenu = () => {
    return (
        <div className="round-menu ml-6">
            <p className="menu__item"></p>
            <p className="menu__item"></p>
            <p className="menu__item"></p>
        </div>
    );
};

const Line = () => {
    const style = { maxWidth: '2px', width: "1px", maxHeight: '100%' };
    return (<span className="has-background-grey" style={style}></span>);
};
