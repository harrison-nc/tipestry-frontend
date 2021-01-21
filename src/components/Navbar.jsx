import React, { Fragment } from 'react';

const Navbar = () => {
    return (
        <Fragment>
            <div className="navbar has-background-link py-4 px-5">
                <div className="container is-flex">
                    <div className="brand">
                        <span className="subtitle">
                            <a alt="navigate to home" href="/">Tipestry</a>
                        </span>
                    </div>

                    <nav className="nav-items is-flex">
                        <a className="nav-item btn py-5 px-5" href="#post-dialog">Post</a>
                        <a className="nav-item btn py-5 px-5" href="#login">Login</a>
                        <a className="nav-item btn py-5 px-5" href="#register">Join Us</a>
                        <button className="nav-item btn py-5 px-5">en</button>
                    </nav>
                </div>
            </div>
        </Fragment>
    );
}

export default Navbar;
