import '../css/modal.css';

import { Input } from './RegisterDialog';

const PostDialog = ({ id }) => {
    return (
        <div id={id} className="modal-window">
            <form>
                <div className="form is-flex flex-column box has-background-white py-4 px-2">
                    <p className="subtitle has-color-link flex-grow mb-2">Add post</p>

                    <Input
                        label="URL"
                        name="resourceUrl"
                        type="url"
                        placeholder="Enter resource URL" />

                    <Input
                        label="Title"
                        name="title"
                        type="text"
                        placeholder="Enter post title" />

                    <div className="control is-flex">
                        <label htmlFor="description" className="label">Details</label>
                        <textarea id="description" className="input" rows="5" name="description" placeholder="Enter post details"></textarea>
                    </div>

                    <div className="control is-flex right-control mt-2">
                        <a className="btn modal-close close" href="/">Cancel</a>
                        <button className="btn modal-accept has-color-white is-primary">Save</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default PostDialog;
