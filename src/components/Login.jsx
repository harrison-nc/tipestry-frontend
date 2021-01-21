import '../css/modal.css';

import Input from './Input';

const Login = ({ id }) => {
    return (
        <div id={id} className="modal-window">
            <form>
                <div className="form is-flex flex-column box has-background-white py-4 px-2">

                    <div className="control header is-flex">
                        <p className="subtitle has-color-link flex-grow mb-4">Sign in</p>
                        <a href="/" title="Close" className="close modal-close has-color-black">Close</a>
                    </div>

                    <Input
                        label="Email"
                        type="email"
                        name="email"
                        placeholder="Enter email address" />

                    <Input
                        label="Password"
                        type="password"
                        name="password"
                        placeholder="Enter password" />

                    <div className="control buttons is-flex mt-3">
                        <input className="btn py-4 px-3 is-primary" type="submit" value="Login" />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Login;
