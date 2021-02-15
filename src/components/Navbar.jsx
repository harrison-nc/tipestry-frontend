import React from 'react';
import { NavItems } from "./navbar/NavItems";
import { Brand } from './navbar/Brand';

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
