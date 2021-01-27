import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = (props) => {
    const location = useLocation();
    const { loggedInUser } = props;

    let navLinks;

    if (loggedInUser) {
        navLinks = (
            <>
                <span className="name has-text-white">@{loggedInUser.name}</span>
                <span className="has-background-grey" style={{ maxWidth: '2px', width: "1px", maxHeight: '100%' }}></span>
                <Link className="nav__item px-5 has-text-white" to="/post">Post</Link>
            </>
        );
    }
    else {
        const state = { background: location };
        const links = {
            post: {
                pathname: '/post',
                state,
            },
            login: {
                pathname: '/login',
                state,
            },
            register: {
                pathname: '/register',
                state,
            }
        };

        navLinks = (
            <>
                <Link className="nav__item px-5 has-text-white" to={links.post}>Post</Link>
                <Link className="nav__item px-5 has-text-white" to={links.login}>Login</Link>
                <Link className="nav__item px-3 has-shadow is-rounded is-white" to={links.register}>Join Us</Link>
            </>
        );
    }

    return (
        <div className="navbar has-background-link py-4 px-5">
            <div className="nav is-flex">
                <div className="nav__brand">
                    <span className="title">
                        <a alt="navigate to home" href="/">Tipestry</a>
                    </span>
                </div>

                <nav className="nav__items is-flex">
                    {navLinks}

                    <button className="nav__btn btn px-5 is-outlined is-white">en</button>
                </nav>
            </div>
        </div>
    );
}

export default Navbar;
