import RegisterDialog from './RegisterDialog';
import LoginDialog from './LoginDialog';

import React, { Fragment } from 'react';

const Navbar = () => {
    return (
        <Fragment>
            <div className="navbar has-background-link py-4 px-5">
                <div className="container">
                    <div className="brand">
                        <span className="subtitle">
                            Tipestry
                    </span>

                    </div>
                    <nav className="nav-items is-flex">
                        <a className="nav-item btn py-5 px-5" href="/">Post</a>
                        <a className="nav-item btn py-5 px-5" href="#login-dialog">Login</a>
                        <a className="nav-item btn py-5 px-5" href="#register-dialog">Join Us</a>
                        <button className="nav-item btn py-5 px-5">en</button>
                    </nav>
                </div>
            </div>
            <RegisterDialog id="register-dialog" />
            <LoginDialog id="login-dialog" />
        </Fragment>
    );
}

export default Navbar;
