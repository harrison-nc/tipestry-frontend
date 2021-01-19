import '../css/modal.css';

export const Input = ({ label, type, name, placeholder }) => {
    return (
        <div className="control is-flex">
            <label for={name} className="label">{label}:</label>
            <input className="input" id={name} type={type} name={name} placeholder={placeholder} />
        </div>
    );
};

const RegisterDialog = ({ id }) => {
    return (
        <div id={id} class="modal-window">
            <form>
                <div className="form is-flex flex-column box has-background-white pt-2 pb-4 px-2">

                    <p className="subtitle has-color-link flex-grow mb-2">Register user</p>

                    <Input
                        label="Username"
                        type="text"
                        name="name"
                        placeholder="Enter username" />

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

                    <Input
                        label="Confirm Password"
                        type="password"
                        placeholder="Confirm password" />

                    <div className="control buttons is-flex mt-3">
                        <a href="/" title="Close" className="close modal-close has-color-black">Cancel</a>
                        <input className="btn py-4 px-3 is-primary" type="submit" value="Register" />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default RegisterDialog;
