import React from 'react';
import { NavItems } from "./navbar/NavItems";
import { Banner } from './navbar/Banner';

export default function Navbar({ loggedInUser }) {
    return (
        <div className="navbar has-background-link py-4 px-5">
            <div className="nav is-flex">
                <Banner>Tipestry</Banner>
                <NavItems user={loggedInUser} />
            </div>
        </div>
    );
}
