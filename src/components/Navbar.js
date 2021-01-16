
function handleLogin(e) {
    console.log('login clicked!', e);
}

function handleLang(e) {
    console.info('changin language');
}

function Navbar() {
    return (
        <div className="nav px-3 py-3">
            <div className="brand">
                Tipestry
            </div>
            <div className="buttons">
                <button onClick={(e) => handleLogin(e)}>Login</button>
                <button onClick={e => console.info('Join Us clicked', e)}>Join Us</button>
                <button onClick={handleLang}>en</button>
            </div>
        </div>
    );
}

export default Navbar;
