import { useContext, useReducer } from 'react';
import { URL, Title, Description } from './Inputs';
import { useNavigator } from '../../hooks/useNavigator';
import { Tags, TagInput } from "./Tags";
import { Control } from "./Control";
import { Upload } from "./Upload";
import { Header } from "./Header";
import { createPost, RequestError, uploadImage } from '../../data/post';
import { PostDispatch } from '../../hooks/usePosts';
import { UserData } from '../../hooks/useUser';

export default function Post({ isModal }) {
    const user = useContext(UserData);
    const postDispatch = useContext(PostDispatch)
    const navigator = useNavigator(isModal);
    const [state, dispatch, validateState, isValid] = useState();

    const handleBlur = (event) => {
        validateState(state, event.target.name);
    }

    const handleFocus = (event) => {
        const { name } = event.target;
        dispatch({ type: `${name.toUpperCase()}_ERROR`, value: '' });
    }

    const handleClear = () => {
        dispatch({ type: "CLEAR" });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        dispatch({ type: name.toUpperCase(), value });
    }

    const handleRemoveTag = (item) => {
        const { tags } = state;
        const items = [...tags];
        const index = items.indexOf(item);
        items.splice(index, 1);
        dispatch({ type: 'TAGS', value: items });
    };

    const handleAddTag = (tagName) => {
        if (tagName.trim() === '') return;

        const { tags } = state;
        const items = [...tags];
        items.push(tagName);
        dispatch({ type: 'TAGS', value: items });
    };

    const handleRemoveFile = () => {
        dispatch({ type: 'REMOVE_FILE' });
    };

    const handleFileChange = (event) => {
        const { files } = event.target;
        const file = files && files[0];

        if (!file) return;

        dispatch({ type: 'FILE', value: file });
    };

    const handleClose = (event) => {
        event.preventDefault();
        handleClear(event);
        navigator.goBack();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!isValid()) {
            console.debug('# invalid input');
            return;
        }

        dispatch({ type: 'SENDING', value: true });

        try {
            let url = await uploadFile(state);

            const { title, description, tags } = state;
            const data = new FormData();

            data.append('resourceUrl', url);
            data.append('title', title);
            data.append('description', description);
            data.append('tags', tags);

            await create(user, data, dispatch, postDispatch, navigator);

        } catch (error) {
            if (error instanceof UploadError) {
                dispatch({ type: "ERROR", value: error.message });
            }
            console.error(error);
        }
    }

    return (
        <div className="post rows">
            <form className="post__content columns has-background-white box py-4 px-3"
                noValidate
                method="post"
                onSubmit={handleSubmit}>

                <Header onClose={handleClose} />

                <span className="error">{state.errorMessage}</span>

                <Upload
                    value={state.file}
                    src={state.fileurl}
                    onRemove={handleRemoveFile}
                    onFileChange={handleFileChange} />

                {!state.file &&
                    <URL
                        autoComplete="photo"
                        disabled={state.isSending}
                        value={state.url}
                        errorMessage={state.urlErrorMessage}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        onFocus={handleFocus} />
                }

                <Title
                    disabled={state.isSending}
                    value={state.title}
                    errorMessage={state.titleErrorMessage}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={handleFocus} />

                <Description
                    disabled={state.isSending}
                    value={state.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={handleFocus} />

                <Tags
                    value={state.tags}
                    onRemove={handleRemoveTag} />

                <TagInput
                    onAdd={handleAddTag}
                    isDisabled={state.isSending || (state.tags && state.tags.length >= 5)} />

                <Control
                    isSending={state.isSending}
                    isDisabled={!isValid()}
                    onClear={handleClear} />
            </form>
        </div>
    );
};

const useState = () => {
    const [state, dispatch] = useReducer(reducer, {
        tags: ['tag'],
        url: '',
        title: '',
        file: null,
        fileurl: '',
        description: '',
        isSending: false,
    });

    const validateFile = (file, url) => {
        let errorMessage = '';
        if (file instanceof File) errorMessage = '';
        else if (!url) errorMessage = 'Please enter a URL or upload a file';
        dispatch({ type: "FILE_ERROR", value: errorMessage });
    };

    const validateTitle = (title) => {
        let errorMessage = '';
        if (!title) errorMessage = "Please enter a valid title";
        else if (title.length < 5) errorMessage = "Title must have at least 5 letters";
        dispatch({ type: "TITLE_ERROR", value: errorMessage });
    };

    const validate = (state, name) => {
        name = name || '';

        switch (name.toUpperCase()) {
            case "FILE": {
                validateFile(state.file, state.url);
                break;
            }
            case "TITLE": {
                validateTitle(state.title);
                break;
            }
            default:
                validateFile(state.file, state.url);
                validateTitle(state.title);
                break;
        }
    };

    const isValid = () => {
        const { file, url, title, titleErrorMessage } = state;

        let hasURL = (url && url !== '');
        let hasFile = (file !== null && file instanceof File);
        let hasTitle = title !== '' && titleErrorMessage === '';

        return (hasFile || hasURL) && hasTitle;
    };

    return [state, dispatch, validate, isValid];
};

const reducer = (state, action) => {
    const { value } = action;

    delete state.errorMessage;

    switch (action.type) {
        case "FILE": {
            const url = window.URL.createObjectURL(value);
            return {
                ...state,
                file: value,
                fileurl: url,
                url: '',
                urlErrorMessage: '',
            }
        }
        case "REMOVE_FILE": {
            return {
                ...state,
                file: null,
                fileurl: '',
                url: '',
                urlErrorMessage: '',
            }
        }
        case "RESOURCEURL": {
            return {
                ...state,
                file: null,
                fileurl: '',
                url: value,
                urlErrorMessage: '',
            }
        }
        case "TITLE": {
            return {
                ...state,
                title: value,
                titleErrorMessage: '',
            }
        }
        case "DESCRIPTION": {
            return {
                ...state,
                description: value,
            }
        }
        case "TAGS": {
            return {
                ...state,
                tags: [...value],
            }
        }
        case "SENDING": {
            return {
                ...state,
                isSending: value,
            }
        }
        case "CLEAR": {
            return {
                file: null,
                fileurl: '',
                url: '',
                title: '',
                description: '',
                tags: ['tag'],
                isSending: false,
            }
        }
        case "URL_ERROR": {
            return {
                ...state,
                urlErrorMessage: value,
            }
        }
        case "TITLE_ERROR": {
            return {
                ...state,
                titleErrorMessage: value,
            }
        }
        case "ERROR": {
            return {
                ...state,
                errorMessage: value,
            }
        }
        default:
            console.debug('invalid action', action);
            return state;
    }
};

function UploadError(message) {
    this.message = message;
}

const uploadFile = async (state) => {
    const { file } = state;
    if (!file) return state.url;

    try {
        const result = await uploadImage(file);

        if (!result.data || !result.data.file) {
            throw new Error('Invalid response.');
        }

        return result.data.file.url;
    } catch (ex) {
        throw new UploadError('Failed to upload image');
    }
};

const create = async (user, data, dispatch, postDispatch, navigator) => {
    try {
        const result = await createPost(user, data);
        const post = result.data;
        dispatch({ type: 'SENDING', value: false });
        postDispatch({ type: "ADD_POST", post });
        navigator.goBack();

    } catch (error) {
        if (error instanceof RequestError) {
            const { errors, errorMessage } = error.data;
            if (errors) {
                function dispatchError(error) {
                    const { key, errorMessage } = error;
                    dispatch({ type: `${key.toUpperCase()}_ERROR`, value: errorMessage });
                }

                errors.forEach(dispatchError);

            } else if (errorMessage) {
                dispatch({ type: "ERROR", value: errorMessage });
            } else {
                console.error(error);
            }
        } else {
            console.error(error);
        }

        dispatch({ type: 'SENDING', value: false });
    }
}
