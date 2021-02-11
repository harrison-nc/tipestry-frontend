import { useState, useEffect } from 'react';
import { URL, Title, Description } from './post/Validators';
import { useNavigator } from '../hooks/useNavigator';
import { ErrorMessage } from "./post/ErrorMessage";
import { useInputs } from "./post/hooks/useInputs";
import { Tags, TagInput } from "./post/Tags";
import { Control } from "./post/Control";
import { Upload } from "./post/Upload";
import { Header } from "./post/Header";
import uploadImage from '../util/image-uploader.js';

export default function Post({ id, isModal, onPost }) {
    const Inputs = useInputs();
    const navigator = useNavigator(isModal);
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
        navigator.goBack();
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

        const file = upload.getValue();
        const result = await uploadImage(file);
        const { url } = result.file;

        const formData = new FormData();
        formData.append('resourceUrl', url);
        formData.append('title', title.getValue());
        formData.append('description', description.getValue());
        formData.append('tags', tagItems.getValue());

        e.target.data = formData;
        const response = await onPost(e);
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
