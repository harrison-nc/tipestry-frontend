import '../css/modal.css';

import { useState } from 'react';

import { FormModal } from './Modal';
import Input, { InputContainer } from './Input';

const noError = '';

const Post = (props) => {
    const { id, onPost } = props;

    const [url, setURL] = useState('');
    const [urlError, setURLError] = useState('');

    const [title, setTitle] = useState('');
    const [titleError, setTitleError] = useState('');

    const [description, setDescription] = useState('');
    const [descriptionError, setDescriptionError] = useState('');

    const [serverError, setServerError] = useState('');

    const reportValidity = () => {
        resetInputError();

        checkValidity('resourceUrl', url);
        checkValidity('title', title);
        checkValidity('description', description);

        return urlError === noError
            && titleError === noError
            && descriptionError === noError;
    };

    const checkValidity = (name, value, error = '') => {
        switch (name) {
            case 'resourceUrl':
                if (error) setURLError(error);
                else if (!value) setURLError('Resource url is required');
                else setURLError(noError);
                break;

            case 'title':
                if (error) setTitleError(error);
                else if (!value) setTitleError('Title is required');
                else setTitleError(noError);
                break;

            case 'description':
                if (error) setDescriptionError(error);
                else setDescriptionError(noError);
                break;

            default:
                setServerError(error);
                break;
        }
    };

    const resetInputError = (name) => {
        setServerError(noError);
        switch (name) {
            case 'resourceUrl':
                setURLError(noError);
                break;

            case 'title':
                setTitleError(noError);
                break;

            case 'description':
                setDescriptionError(noError);
                break;

            default:
                setURLError(noError);
                setTitleError(noError);
                setDescriptionError(noError);
                break;
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        switch (name) {
            case 'resourceUrl':
                setURL(value);
                break;

            case 'title':
                setTitle(value);
                break;

            case 'description':
                setDescription(value);
                break;

            default:
                break;
        }

        resetInputError(name);
        checkValidity(name, value);
    }

    const handleReset = (e) => {
        e.preventDefault();

        setURL('');
        setTitle('');
        setDescription('');
        resetInputError();

        window.location.href = '#app';
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = reportValidity();

        if (isValid) {
            try {

                const error = await onPost({ url, title, description });

                if (error) {
                    if (error.auth) checkValidity('', '', error.auth.message);
                }

                console.log(error);

                return;
            }
            catch (ex) {
                console.error(ex);
            }
            handleReset(e);
        }
    }

    return (
        <div className="post">
            <FormModal id={id}
                method="post"
                onReset={handleReset}
                onSubmit={handleSubmit}
                title="Add post">

                <Input type='url'
                    name='resourceUrl'
                    label='Resource url'
                    placeholder='Enter resource url'
                    value={url}
                    hasError={urlError}
                    onChange={handleChange} />

                <Input
                    label="Title"
                    name="title"
                    type="text"
                    placeholder="Enter post title"
                    value={title}
                    hasError={titleError}
                    onChange={handleChange} />

                <InputContainer label="Description">
                    {descriptionError && <span>{descriptionError}</span>}

                    <textarea id="description"
                        className="input py-4 px-4 size-medium"
                        rows="5"
                        name="description"
                        placeholder="Enter post details"
                        value={description}
                        onChange={handleChange}></textarea>
                </InputContainer>

                {serverError && <span className="error">{serverError}</span>}

                <div className="control is-flex right-control mt-2">
                    <button className="btn modal-close close" type="reset">Cancel</button>
                    <button className="btn modal-accept has-color-white is-primary">Save</button>
                </div>
            </FormModal>
        </div>
    );
};

export default Post;
