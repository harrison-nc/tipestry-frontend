import { createRef, useState, useEffect } from 'react';
import { createInput, createInputTextArea } from '../components/Input';
import { useFormInput } from '../hooks/InputHooks';
import FancyButton from '../components/FancyButton';
import { useBackgroundNavigator } from '../hooks/useBackgroundNavigator';

const Post = ({ id, isModal, onPost }) => {
    const Inputs = useInputs();
    const navigator = useBackgroundNavigator(isModal);
    const [serverError, setServerError] = useState('');
    const [uploadImageURL, setUploadImageURL] = useState('');

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
        navigator.back();
    }

    const handleSubmitFailure = (error) => {
        if (!error) return console.error('An error occured while creating post:', error);
        else if (error instanceof Error) console.error(error);
        else if (error.auth) setServerError(error.auth.message);
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

        e.target.data = formData;

        const response = await onPost(e);

        responseHandler(e, response);
    };

    const sendUpload = async (e) => {
        const { upload, title, description, tagItems } = Inputs;

        const formData = new FormData();
        formData.append('file', upload.getValue());
        formData.append('title', title.getValue());
        formData.append('description', description.getValue());
        formData.append('tags', tagItems.getValue());

        e.target.data = formData;

        const response = await onPost(e, true);

        responseHandler(e, response);
    };

    const responseHandler = (e, response) => {
        if (!response) return showError(new Error('Invalid response:', response));
        else if (response.succeeded === false) return handleSubmitFailure(response.error);

        handleClose(e);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = Inputs.validateAll();

        if (!isValid) return;

        Inputs.disableAll();

        try {

            if (Inputs.upload.props.value) await sendUpload(e);

            else await sendFormDate(e);

        } catch (ex) {
            handleSubmitFailure(ex);
        }

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
                <Control isModal={isModal} onClear={handleClear} onSubmit={handleSubmit} />
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

const Control = ({ isModal, onClear, onSubmit }) => {
    const ref = createRef();
    const [isSending, setIsSending] = useState(false);
    const navigator = useBackgroundNavigator(isModal);

    const handleSubmit = async (e) => {
        setIsSending(true);
        await onSubmit(e);
        setIsSending(false);
        navigator.goBack();
    };

    return (
        <div className="post__control is-flex right-control mt-2">
            <button className="btn cancel is-white is-outlined" type="button" onClick={onClear}>
                clear
            </button>
            <FancyButton className="btn is-primary py-4 px-3 is-bold"
                text="Post"
                ref={ref}
                isSending={isSending}
                onClick={handleSubmit} />
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
