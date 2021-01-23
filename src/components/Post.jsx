import '../css/modal.css';

import { useState } from 'react';

import { FormModal } from './Modal';
import Input, { InputContainer } from './Input';

import { createValidator } from '../util/validators';

const none = (e) => { };

const Post = (props) => {
    const { id, onPost } = props;

    const [url, setURL] = useState('');
    const [urlError, setURLError] = useState('');

    const [title, setTitle] = useState('');
    const [titleError, setTitleError] = useState('');

    const [description, setDescription] = useState('');

    const [tagItems, setTagItems] = useState([]);
    const [tagName, setTagName] = useState('');

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
            ...createValidator(none),
            setValue: setDescription,
            setError: none
        },

        tagName: {
            ...createValidator(none),
            setValue: setTagName,
            setError: none
        }
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

        else input.validate(value);
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
    };

    const showError = (error) => {
        const { key, value, message } = error;

        const input = Validators[key];

        if (input) input.setError(message);

        else console.error(`${message}: '${key}', '${value}`, error);
    };

    const handleRemoveTag = (item) => {
        const items = [...tagItems];
        const index = items.indexOf(item);

        items.splice(index, 1);

        setTagItems(items);
    };

    const handleAddTag = (e) => {
        if (tagName === '') return;

        const items = [...tagItems];

        items.push(tagName);

        setTagItems(items);
        setTagName('');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        const input = Validators[name];

        if (input) return input.setValue(value && value.trim());

        console.error(`'${name}' is not a valid input`);
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

            const error = await onPost({ resourceUrl: url, title, description });

            if (!error) handleReset(e);

            else if (error.auth) setServerError(error.auth.message);

            else if (error instanceof Array) error.forEach(showError);

            else showError(error);

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
                    <textarea id="description"
                        className="input py-4 px-4 size-medium"
                        name="description"
                        placeholder="Enter post details"
                        value={description}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChange={handleChange}></textarea>
                </InputContainer>

                <ul className="tags is-flex"> {tagItems.map((item, i) =>
                    <li key={i} className="tag__item">
                        <span className="tag__item__hash">#</span><span className="tag__item__text">{item}</span><span className="tag__item__btn" onClick={() => handleRemoveTag(item)}>x</span>
                    </li>)}
                </ul>

                <fieldset className="tag__control py-6 px-6">
                    <legend>Tags</legend>
                    <div className="is-flex mt-3">
                        <input className="tag__input flex-grow py-4 px-4" type="text" name="tagName" value={tagName} onChange={handleChange} />
                        <button type="button" onClick={handleAddTag}>Add</button>
                    </div>
                </fieldset>

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
