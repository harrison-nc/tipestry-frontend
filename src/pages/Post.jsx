import { createRef, useState } from 'react';
import { createInput, createInputTextArea } from '../components/Input';
import { useFormInput } from '../hooks/InputHooks';
import { useHistory, useLocation } from 'react-router-dom';
import FancyButton from '../components/FancyButton';

const Post = (props) => {
    const location = useLocation();
    const history = useHistory();
    const Inputs = useInputs();
    const [serverError, setServerError] = useState('');
    const [isSending, setIsSending] = useState('');

    const { id, isModal, onPost } = props;
    const background = location.state && location.state.background;

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
        if (isModal && background) history.replace(background.pathname, location.state);
        else history.goBack();
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

        setIsSending(true);
        Inputs.disableAll();

        try {
            const { error } = await onPost({
                resourceUrl: Inputs.url.getValue(),
                title: Inputs.title.getValue(),
                description: Inputs.description.getValue(),
                tags: Inputs.tagItems.getValue(),
            });

            if (error) handleSubmitFailure(error);
            else handleClose(e);

        } catch (ex) {
            handleSubmitFailure(ex);
        }
        setTimeout(() => {
            setIsSending(false);
            Inputs.enableAll();

        }, 5000);
    }


    return (
        <div className="post is-flex">
            <div id={id} className="post__content is-flex flex-column has-background-white box py-4 px-3" >

                <Header onClose={handleClose} />
                <URL {...Inputs.url.props} />
                <Title {...Inputs.title.props} />
                <Description {...Inputs.description.props} />

                <Tags
                    values={Inputs.tagItems.props.value}
                    onRemove={handleRemoveTag}
                />

                <TagInput
                    onAdd={handleAddTag}
                    {...Inputs.tagName.props}
                />

                {serverError && <ErrorMessage value={serverError} />}

                <Control isSending={isSending} onClear={handleClear} onSubmit={handleSubmit} />
            </div>
        </div>
    );
};

const Header = ({ onClose }) => {
    return (
        <div className="header is-flex">
            <p className="title has-text-link">
                Add post
            </p>
            <button className="close btn" onClick={onClose}>X</button>
        </div>
    );
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
    const { value, onAdd, onChange, hasError, ...rest } = props;

    return (
        <fieldset className="tag__control py-6 px-6 field">
            <legend>Tags</legend>
            <div className="is-flex mt-3">
                <input className="tag__input input size-medium flex-grow py-4 px-4" type="text" name="tagName" placeholder="Enter tag name" {...rest} value={value} onChange={onChange} />
                <button type="button" onClick={onAdd}>Add</button>
            </div>
        </fieldset>
    );
};

const Control = ({ isSending, onClear, onSubmit }) => {
    const ref = createRef();

    return (
        <div className="post__control is-flex right-control mt-2">
            <button className="btn cancel is-white is-outlined" type="button" onClick={onClear}>
                clear
            </button>
            <FancyButton className="btn is-primary py-4 px-3 is-bold" text="Post" ref={ref} isSending={isSending} onClick={onSubmit} />
        </div>
    );
};

const ErrorMessage = ({ value }) => {
    return <span className="error">{value}</span>
};

const useInputs = () => {
    const url = useFormInput('', value => {
        return !value ? 'Resource url is required' : '';
    });

    const title = useFormInput('', value => {
        return !value ? 'Title is required' : '';
    });

    const tagItems = useFormInput(['tag'], () => '', []);
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
        },

        disableAll() {
            this.asArray().forEach(i => i.disable());
        },

        enableAll() {
            this.asArray().forEach(i => i.enable());
        }
    });
};

export default Post;
