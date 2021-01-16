
function handleLogin(e) {
    console.log('login clicked!', e);
}

function handleLang(e) {
    console.info('changin language');
}

function Navbar() {
    return (
        <div id="nav-container">
            <button onClick={(e) => handleLogin(e)}>Login</button>
            <button onClick={e => console.info('Join Us clicked', e)}>Join Us</button>
            <button onClick={handleLang}>en</button>
        </div>
    );
}

export default Navbar;
