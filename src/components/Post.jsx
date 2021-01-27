import '../css/modal.css';
import { Fragment, useState } from 'react';
import { FormModal } from './modal/Modal';
import { createInput, createInputTextArea } from './Input';
import { useFormInput } from '../hooks/InputHooks';

const Post = (props) => {
    const { id, onPost } = props;
    const Inputs = useInputs();
    const [serverError, setServerError] = useState('');

    const showError = (error) => {
        const { key, value, message } = error;
        const input = Inputs[key];
        if (input) input.setError(message);
        else console.error(`${message}: '${key}', '${value}`, error);
    };

    const handleClear = (e) => {
        Inputs.asArray().forEach(input => input.reset());
        setServerError('');
    };

    const handleRemoveTag = (item) => {
        const { tagItems } = Inputs;
        const items = [...tagItems.getValue()];
        const index = items.indexOf(item);
        items.splice(index, 1);
        tagItems.setValue(items);
    };

    const handleAddTag = (e) => {
        const { tagName, tagItems } = Inputs;
        const { value } = tagName.props;

        if (value.trim() === '') return;

        const items = [...tagItems.getValue()];
        items.push(value);
        tagItems.setValue(items);
        tagName.setValue('');
    };

    const handleClose = (e) => {
        e.preventDefault();
        handleClear(e);
        window.location.href = '#app';
    }

    const handleSubmitFailure = (error) => {
        if (error.auth) setServerError(error.auth.message);
        else if (error instanceof Array) error.forEach(showError);
        else showError(error);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = Inputs.validateAll();

        if (!isValid) return;

        try {
            const error = await onPost({
                resourceUrl: Inputs.url.getValue(),
                title: Inputs.title.getValue(),
                description: Inputs.description.getValue(),
                tags: Inputs.tagItems.getValue(),
            });

            if (!error) handleClose(e);
            else handleSubmitFailure(error);

        } catch (ex) {
            handleSubmitFailure(ex);
        }
    }

    const closeButton = <input className="close modal-close btn" type="reset" value="X" />;

    const form = {
        id,
        method: "post",
        onReset: handleClose,
        onSubmit: handleSubmit,
        title: "Add post",
        close: closeButton,
    };

    return (
        <div className="post">
            <FormModal {...form}>
                <URL {...Inputs.url.props} />
                <Title {...Inputs.title.props} />
                <Description {...Inputs.description.props} />
                <Tags
                    values={Inputs.tagItems.props.value}
                    onRemove={handleRemoveTag}
                />
                <TagInput
                    value={Inputs.tagName.props.value}
                    onAdd={handleAddTag}
                    onChange={Inputs.tagName.props.onChange}
                />
                <Error hasError={serverError} />
                <Control onClear={handleClear} />
            </FormModal>
        </div>
    );
};

const useInputs = () => {
    const url = useFormInput('', value => {
        return !value ? 'Resource url is required' : '';
    });

    const title = useFormInput('', value => {
        return !value ? 'Title is required' : '';
    });

    const tagItems = useFormInput([], () => '', []);
    const tagName = useFormInput('');
    const description = useFormInput('');

    return Object.freeze({
        url,
        title,
        description,
        tagItems,
        tagName,

        asArray() {
            return [url, title, description, tagItems, tagName];
        },

        validateAll() {
            const validate = input => input.validate() === '';
            const isValid = (a, b) => a && b;
            return this.asArray().map(validate).reduce(isValid, true);
        }
    });
};

const URL = createInput({
    type: 'url',
    name: 'resourceUrl',
    label: 'Resource url*',
    placeholder: 'Enter resource url',
});

const Title = createInput({
    type: "text",
    name: "title",
    label: "Title*",
    placeholder: "Enter post title",
});

const Description = createInputTextArea({
    id: "description",
    name: "description",
    label: "Description",
    placeholder: "Enter post details",
});

const Tags = (props) => {
    const { values, onRemove } = props;

    return (
        <ul className="post__tags is-flex"> {values.map((item, i) =>
            <li key={i} className="tag__item">
                <span className="tag__item__hash">#</span><span className="tag__item__text">{item}</span><span className="tag__item__btn" onClick={() => onRemove(item)}>x</span>
            </li>)}
        </ul>
    );
};

const TagInput = (props) => {
    const { value, onAdd, onChange } = props;

    return (
        <fieldset className="tag__control py-6 px-6">
            <legend>Tags</legend>
            <div className="is-flex mt-3">
                <input className="tag__input flex-grow py-4 px-4" type="text" name="tagName" value={value} onChange={onChange} />
                <button type="button" onClick={onAdd}>Add</button>
            </div>
        </fieldset>
    );
};

const Control = (props) => {
    const { onClear } = props;

    return (
        <div className="control is-flex right-control mt-2">
            <button className="btn modal-close close" type="button" onClick={onClear}>
                clear
            </button>
            <button className="btn has-color-white is-primary py-4 px-3">
                Save
            </button>
        </div>
    );
};

const Error = (props) => {
    const { hasError } = props;

    return (
        <Fragment>
            {hasError && <span className="error">{hasError}</span>}
        </Fragment>
    );
};

export default Post;
