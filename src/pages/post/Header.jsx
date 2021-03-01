export const Header = ({ onClose }) => {
    return (
        <div className="header rows">
            <p className="title has-text-link">
                Add post
            </p>
            <button className="close btn" type="button" onClick={onClose}>X</button>
        </div>
    );
};
