import React from 'react';
import { NavItems } from "./NavItems";
import { Brand } from './Brand';

export default function Navbar() {
    return (
        <div className="navbar has-background-link py-4 px-5 is-flex">
            <div className="nav is-flex">
                <Brand>Tipestry</Brand>
                <NavItems />
            </div>
        </div>
    );
}
