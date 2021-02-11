export const Header = ({ onClose }) => {
    return (
        <div className="header is-flex">
            <p className="title has-text-link">
                Add post
            </p>
            <button className="close btn" onClick={onClose}>X</button>
        </div>
    );
};
