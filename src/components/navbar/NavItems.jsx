import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { NavItem } from './NavItem';
import { User } from './User';
import { useLinks } from "./hooks/useLinks";
import { UserData } from '../../hooks/useUser';

export const NavItems = () => {
    const links = useLinks();
    const user = useContext(UserData);

    return (
        <nav className="nav__items is-flex">
            {user && user.loggedIn &&
                <>
                    <User user={user} />
                    <Line />
                </>
            }

            <NavItem link={links.post} keep={true}>Post</NavItem>

            {(!user || !user.loggedIn) &&
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
    const links = useLinks();
    const [style, setStyle] = useState({ display: 'none' });
    const root = document.querySelector('body');

    const showPopup = (event) => setStyle({ display: 'flex' });
    const hidePopup = (event) => {
        root.classList.remove('overflow-hidden');
        root.removeEventListener('click', hidePopup);
        setStyle({ display: 'none' });
    }

    function handleClick(event) {
        root.classList.add('overflow-hidden');
        root.addEventListener('click', hidePopup, true);
        showPopup();
    }

    return (
        <div className="round-menu ml-6" onClick={handleClick} >
            <p className="menu__item"></p>
            <p className="menu__item"></p>
            <p className="menu__item"></p>
            <div className="popup-container" style={style}>
                <div className="popup-menu box has-background-white">
                    <Link className="popup__item" to={links.login}>Login</Link>
                    <Link className="popup__item" to={links.register}>Join Us</Link>
                </div>
            </div>
        </div>
    );
};

const Line = () => {
    const style = { maxWidth: '2px', width: "1px", maxHeight: '100%' };
    return (<span className="has-background-grey" style={style}></span>);
};
