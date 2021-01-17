import React from 'react';

const Navbar = () => {
    return (
        <div className="navbar">
            <div container>
                <div className="brand">
                    Tipestry
                </div>
                <nav className="navItem">
                    <button>Login</button>
                    <button>Join Us</button>
                    <button>en</button>
                </nav>
            </div>
        </div>
    );
}

export default Navbar;
