
function handleLogin(e) {
    console.log('login clicked!', e);
}

function handleLang(e) {
    console.info('changin language');
}

function Navbar() {
    return (
        <div className="navbar">
            <div container>
                <div className="brand">
                    Tipestry
                </div>
                <nav className="navItem">
                    <button onClick={(e) => handleLogin(e)}>Login</button>
                    <button onClick={e => console.info('Join Us clicked', e)}>Join Us</button>
                    <button onClick={handleLang}>en</button>
                </nav>
            </div>
        </div>
    );
}

export default Navbar;
