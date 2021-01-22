import '../css/modal.css';

import { FormModal } from './Modal';
import Input, { InputContainer } from './Input';

const Post = (props) => {
    const { id } = props;

    const handleReset = () => {

    }

    const handleSubmit = () => {

    }

    return (
        <div className="post">
            <FormModal id={id}
                method="post"
                onReset={handleReset}
                onSubmit={handleSubmit}
                title="Add post">

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

                <InputContainer label="Description">
                    <textarea id="description"
                        className="input py-4 px-4 size-medium"
                        rows="5"
                        name="description"
                        placeholder="Enter post details"></textarea>
                </InputContainer>

                <div className="control is-flex right-control mt-2">
                    <a className="btn modal-close close" href="/">Cancel</a>
                    <button className="btn modal-accept has-color-white is-primary">Save</button>
                </div>
            </FormModal>
        </div>
    );
};

export default Post;
