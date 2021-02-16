import { useState, useEffect } from 'react';
import { URL, Title, Description } from './Validators';
import { useNavigator } from '../../hooks/useNavigator';
import { usePostInputs } from "../../hooks/usePostInputs";
import { Tags, TagInput } from "./Tags";
import { Control } from "./Control";
import { Upload } from "./Upload";
import { Header } from "./Header";
import { uploadImage } from '../../data/post';

export default function Post({ id, isModal, onPost }) {
    const Inputs = usePostInputs();
    const navigator = useNavigator(isModal);
    const [errorMessage, setErrorMessage] = useState('');
    const [uploadImageURL, setUploadImageURL] = useState('');
    const [isSending, setIsSending] = useState(false);

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
        setErrorMessage('');
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

    const handleResponse = (event, response) => {
        if (response instanceof Error) console.debug(response);
        else if (response.errorMessage) setErrorMessage(response.errorMessage);
        else if (response.errors instanceof Array) response.errors.forEach(showError);
        else showError(response);
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

        if (response) {
            handleResponse(e, response);
        } else {
            navigator.goBack();
        }
    };

    const sendUpload = async (e) => {
        const { upload, title, description, tagItems } = Inputs;

        const file = upload.getValue();
        const result = await uploadImage(file);
        const { url } = result.data.file;

        const formData = new FormData();
        formData.append('resourceUrl', url);
        formData.append('title', title.getValue());
        formData.append('description', description.getValue());
        formData.append('tags', tagItems.getValue());

        e.target.data = formData;
        const response = await onPost(e);

        if (response) {
            handleResponse(e, response);
        } else {
            navigator.goBack();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = Inputs.validateAll();

        if (!isValid) return;

        setIsSending(true);
        Inputs.disableAll();

        try {

            if (Inputs.upload.props.value) await sendUpload(e);

            else await sendFormDate(e);

        } catch (ex) {
            handleResponse(e, ex);
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
            <form
                onSubmit={handleSubmit}
                className="post__content is-flex flex-column has-background-white box py-4 px-3">
                <Header onClose={handleClose} />

                {errorMessage && <span className="error">{errorMessage}</span>}

                <Upload
                    value={Inputs.upload.props.value}
                    src={uploadImageURL}
                    onRemove={handleRemoveFile}
                    onFileChange={handleFileChange} />

                {!Inputs.upload.props.value && <URL {...Inputs.url.props} autoComplete="photo" />}

                <Title {...Inputs.title.props} />
                <Description {...Inputs.description.props} />
                <Tags values={Inputs.tagItems.props.value} onRemove={handleRemoveTag} />
                <TagInput onAdd={handleAddTag} {...Inputs.tagName.props} />
                <Control isSending={isSending} onClear={handleClear} />
            </form>
        </div>
    );
};
