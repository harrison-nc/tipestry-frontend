import '../css/modal.css';

import { useState } from 'react';

import { FormModal } from './Modal';
import Input, { InputContainer } from './Input';

const noError = '';

const createValidator = (fun) => {
    return {
        notValid(value) {
            return fun(value);
        },
        isValid(value) {
            return !this.notValid(value);
        }
    }
};

const Validators = {
    resourceUrl: createValidator(value => !value ? 'Resource url is required' : ''),

    title: createValidator(value => !value ? 'Title is required' : ''),

    description: createValidator(value => ''),
}

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
    };

    const checkValidity = (name, value, errorMessage = '') => {
        const validator = Validators[name];
        const error = validator.notValid(value);

        switch (name) {
            case 'resourceUrl':
                if (errorMessage) setURLError(errorMessage);
                else setURLError(error);
                break;

            case 'title':
                if (errorMessage) setTitleError(errorMessage);
                else setTitleError(error);
                break;

            case 'description':
                if (errorMessage) setDescriptionError(errorMessage);
                else setDescriptionError(error);
                break;

            default:
                setServerError(errorMessage);
                break;
        }
    };

    const isValid = (name, value) => {
        const validator = Validators[name];

        if (!validator) return false;

        return validator.isValid(value);
    };

    const validateInputs = () => {
        return isValid('resourceUrl', url)
            && isValid('title', title)
            && isValid('description', description);
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
    }

    const handleFocus = (e) => resetInputError(e.target.name);

    const handleBlur = (e) => checkValidity(e.target.name, e.target.value);

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

        const isValid = validateInputs();

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
            return;
        }
        else {
            reportValidity();
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
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={handleChange} />

                <Input
                    label="Title"
                    name="title"
                    type="text"
                    placeholder="Enter post title"
                    value={title}
                    hasError={titleError}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={handleChange} />

                <InputContainer label="Description">
                    {descriptionError && <span>{descriptionError}</span>}

                    <textarea id="description"
                        className="input py-4 px-4 size-medium"
                        rows="5"
                        name="description"
                        placeholder="Enter post details"
                        value={description}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
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
