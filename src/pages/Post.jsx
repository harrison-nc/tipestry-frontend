import { createRef, useState, useEffect } from 'react';
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
    const [uploadImageURL, setUploadImageURL] = useState('');

    const { id, isModal, onPost } = props;
    const background = location.state && location.state.background;

    useEffect(() => {
        Inputs.url.isRequired(Inputs.upload.props.value ? false : true);
    }, [Inputs.url, Inputs.upload.props.value]);

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

    const sendFormDate = async (e) => {
        const { url, title, description, tagItems } = Inputs;

        const formData = new FormData();
        formData.append('resourceUrl', url.getValue());
        formData.append('title', title.getValue());
        formData.append('description', description.getValue());
        formData.append('tags', tagItems.getValue());

        const { error } = await onPost(formData);

        return error;
    };

    const sendUpload = async (e) => {
        const { upload, title, description, tagItems } = Inputs;

        const formData = new FormData();
        formData.append('file', upload.getValue());
        formData.append('title', title.getValue());
        formData.append('description', description.getValue());
        formData.append('tags', tagItems.getValue());

        const { error } = await onPost(formData, true);

        return error;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = Inputs.validateAll();

        if (!isValid) return;

        setIsSending(true);
        Inputs.disableAll();

        try {
            let error;

            if (Inputs.upload.props.value) error = await sendUpload(e);

            else error = await sendFormDate(e);

            if (error) handleSubmitFailure(error);

            else handleClose(e);

        } catch (ex) {
            handleSubmitFailure(ex);
        }

        setIsSending(false);
        Inputs.enableAll();
    }

    const handleRemoveFile = (e) => {
        Inputs.upload.setValue(false);
    };

    const handleFileChange = (e) => {
        const { files } = e.target;
        const file = files && files[0];
        Inputs.upload.setValue(file || false);

        if (file) setUploadImageURL(window.URL.createObjectURL(file));
    };

    return (
        <div className="post is-flex">
            <div className="post__content is-flex flex-column has-background-white box py-4 px-3"
                id={id}>
                <Header onClose={handleClose} />

                {serverError && <ErrorMessage value={serverError} />}

                <Upload value={Inputs.upload.props.value}
                    src={uploadImageURL}
                    onRemove={handleRemoveFile}
                    onFileChange={handleFileChange} />

                {!Inputs.upload.props.value && <URL {...Inputs.url.props} />}

                <Title {...Inputs.title.props} />
                <Description {...Inputs.description.props} />
                <Tags values={Inputs.tagItems.props.value} onRemove={handleRemoveTag} />
                <TagInput onAdd={handleAddTag} {...Inputs.tagName.props} />
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

const Upload = ({ value, src, onRemove, onFileChange }) => {
    return (
        <div className="upload is-flex flex-column mt-4">
            {value && <img className="upload-image" src={src} alt="file to upload" />}
            <div className="buttons is-flex mt-5">
                <label>
                    <input hidden type="file" name="file" onChange={onFileChange} />
                    <span className="btn px-3 py-4 is-block is-rounded is-outlined is-link">Upload</span>
                </label>
                <button className="btn px-3 py-4 is-rounded is-outlined is-danger" onClick={onRemove}>Remove</button>
            </div>
            <p className="has-text-grey">Your maximun upload size if 5MB</p>
        </div>
    );
};

const URL = createInput({
    type: 'url',
    name: 'resourceUrl',
    label: 'Url*',
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
            <legend className="legend">Tags</legend>
            <div className="is-flex mt-3">
                <input className="tag__input input flex-grow py-4 px-4" type="text" name="tagName" placeholder="Enter tag name" {...rest} value={value} onChange={onChange} />
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
    const upload = useFormInput();

    return Object.freeze({
        url,
        title,
        description,
        tagItems,
        tagName,
        upload,

        asArray() {
            return [url, title, description, tagItems, tagName, upload];
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
