export const Upload = ({ value, src, onRemove, onFileChange }) => {
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
