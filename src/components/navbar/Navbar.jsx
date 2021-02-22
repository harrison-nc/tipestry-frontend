import React from 'react';
import { NavItems } from "./NavItems";
import { Brand } from './Brand';

export default function Navbar() {
    return (
        <div className="navbar has-background-link py-4 px-5 rows">
            <div className="nav rows">
                <Brand>Tipestry</Brand>
                <NavItems />
            </div>
        </div>
    );
}
