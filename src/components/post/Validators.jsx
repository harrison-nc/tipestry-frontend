import { createInput, createInputTextArea } from '../Input';

export const URL = createInput({
    type: 'url',
    name: 'resourceUrl',
    label: 'Url*',
    placeholder: 'Enter resource url',
});

export const Title = createInput({
    type: "text",
    name: "title",
    label: "Title*",
    placeholder: "Enter post title",
});

export const Description = createInputTextArea({
    id: "description",
    name: "description",
    label: "Description",
    placeholder: "Enter post details",
});
