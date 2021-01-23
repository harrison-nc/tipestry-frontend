import '../css/modal.css';

import { useState } from 'react';

import { FormModal } from './Modal';
import Input, { InputContainer } from './Input';

import { createValidator } from '../util/validators';

const Post = (props) => {
    const { id, onPost } = props;

    const [url, setURL] = useState('');
    const [urlError, setURLError] = useState('');

    const [title, setTitle] = useState('');
    const [titleError, setTitleError] = useState('');

    const [description, setDescription] = useState('');
    const [descriptionError, setDescriptionError] = useState('');

    const [serverError, setServerError] = useState('');

    const Validators = {
        resourceUrl: {
            ...createValidator(value => !value ? 'Resource url is required' : ''),
            setValue: setURL,
            setError: setURLError
        },

        title: {
            ...createValidator(value => !value ? 'Title is required' : ''),
            setValue: setTitle,
            setError: setTitleError,
        },

        description: {
            ...createValidator(value => ''),
            setValue: setDescription,
            setError: setDescriptionError
        },
    };

    const reportValidity = () => {
        resetInputError();

        checkValidity('resourceUrl', url);
        checkValidity('title', title);
        checkValidity('description', description);
    };

    const checkValidity = (name, value) => {
        const input = Validators[name];

        if (!input) return console.error(`'${name}' is not a valid input`);

        const error = input.notValid(value);

        input.setError(error);
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
        const input = Validators[name];

        if (input) return input.setError('');

        setServerError('');
        setURLError('');
        setTitleError('');
        setDescriptionError('');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        const input = Validators[name];

        if (!input) return;

        input.setValue(value);
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

        if (isValid) try {

            const error = await onPost({ url, title, description });

            if (error && error.auth) setServerError(error.auth.message);

            else if (!error) handleReset(e);

            console.log(error);

        } catch (ex) {
            console.error(ex);
        }

        else reportValidity();
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
