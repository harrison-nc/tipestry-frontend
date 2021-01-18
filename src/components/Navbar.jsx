import React from 'react';

const Navbar = () => {
    return (
        <div className="navbar has-background-link py-4 px-5">
            <div className="container">
                <div className="brand">
                    <span className="subtitle">
                        Tipestry
                    </span>

                </div>
                <nav className="navItem">
                    <button>Post</button>
                    <button>Login</button>
                    <button>Join Us</button>
                    <button>en</button>
                </nav>
            </div>
        </div>
    );
}

export default Navbar;
