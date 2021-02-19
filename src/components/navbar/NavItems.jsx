import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { NavItem } from './NavItem';
import { User } from './User';
import { UserData, UserDispatch } from '../../hooks/useUser';
import { useNavbarLinks } from '../../hooks/useNavbarLinks';

export const NavItems = () => {
    const links = useNavbarLinks();
    const user = useContext(UserData);
    const userDispatch = useContext(UserDispatch);

    const handleLogout = (event) => {
        event.preventDefault();
        userDispatch({ type: "LOGOUT" })
    };

    return (
        <nav className="nav__items is-flex">
            {user && user.loggedIn &&
                <>
                    <User user={user} />
                    <Line />
                    <NavItem link={links.post} keep={true}>Post</NavItem>
                    <LogoutButton className="nav__item" onClick={handleLogout} />
                </>
            }

            {(!user || !user.loggedIn) &&
                <>
                    <NavItem link={links.post} keep={true}>Post</NavItem>
                    <NavItem link={links.login}>Login</NavItem>
                    <NavItem link={links.register} rounded={true}>Join Us</NavItem>
                </>
            }

            <div className="is-flex">
                <button className="nav__btn btn px-5 is-outlined is-white">en</button>
                <RoundMenu loggedIn={user.loggedIn} onLogout={handleLogout} />
            </div>
        </nav>
    );
};

const RoundMenu = ({ loggedIn, onLogout }) => {
    const links = useNavbarLinks();
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
                <div className="popup-menu has-background-white">
                    {loggedIn ?
                        <LogoutButton className="popup__item btn" onClick={onLogout} />
                        :
                        <>
                            <Link className="popup__item" to={links.login}>Login</Link>
                            <Link className="popup__item" to={links.register}>Join Us</Link>
                        </>
                    }
                </div>
            </div>
        </div>
    );
};

const Line = () => {
    const style = { maxWidth: '2px', width: "1px", maxHeight: '100%' };
    return (<span className="has-background-grey" style={style}></span>);
};

const LogoutButton = ({ className, onClick }) => {
    return (
        <button className={`has-text-white btn ${className}`} onClick={onClick}>
            logout
        </button>
    );
};
