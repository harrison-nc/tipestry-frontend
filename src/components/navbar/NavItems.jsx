import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { NavItem } from './NavItem';
import { User } from './User';
import { useLogout, UserData } from '../../hooks/useUser';
import { useNavbarLinks } from '../../hooks/useNavbarLinks';
import pencilIcon from '../../assets/icons/pencil-white.svg';

export const NavItems = () => {
    const links = useNavbarLinks();
    const user = useContext(UserData);
    const logout = useLogout();

    return (
        <nav className="nav__items rows">
            {user && user.loggedIn &&
                <>
                    <User user={user} />
                    <Line />
                    <PostButton link={links.post} />
                    <LogoutButton className="nav__item" onClick={logout} />
                </>
            }

            {(!user || !user.loggedIn) &&
                <>
                    <PostButton link={links.post} />
                    <NavItem link={links.login}>Login</NavItem>
                    <NavItem link={links.register} rounded={true}>Join Us</NavItem>
                </>
            }

            <div className="rows">
                <button className="nav__btn lang btn px-5 is-outlined is-white">en</button>
                <RoundMenu loggedIn={user.loggedIn} onLogout={logout} />
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

const PostButton = ({ link }) => {
    return (
        <NavItem link={link} keep={true}>
            <img src={pencilIcon} alt="pencil icon" style={{ height: "25px", color: "white" }} />
        </NavItem>
    );
}
