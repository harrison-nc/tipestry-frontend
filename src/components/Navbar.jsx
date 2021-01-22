import React, { Fragment } from 'react';

const Navbar = (props) => {
    const { loggedInUser } = props;

    let accountMgtButtons;

    if (loggedInUser) {
        accountMgtButtons = (
            <Fragment>
                <span>@{loggedInUser.name}</span>
                <a className="nav-item btn py-5 px-5" href="#post">Post</a>
            </Fragment>
        );
    }
    else {
        accountMgtButtons = (
            <Fragment>
                <a className="nav-item btn py-5 px-5" href="#post">Post</a>
                <a className="nav-item btn py-5 px-5" href="#login">Login</a>
                <a className="nav-item btn py-5 px-5" href="#register">Join Us</a>
            </Fragment>
        );
    }

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
                        {accountMgtButtons}

                        <button className="nav-item btn py-5 px-5">en</button>
                    </nav>
                </div>
            </div>
        </Fragment>
    );
}

export default Navbar;
