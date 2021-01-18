import React from 'react';

const Footer = (props) => {
    const { likes, disLikes, comments, shares, views } = props;

    return (
        <div className="footer">
            <div className="control">
                <Link name="Like" value={likes} />
                <Link name="Dislike" value={disLikes} />
                <Link name="Comment" value={comments.count} />
                <Link name="Share" value={shares.count} />
            </div>
            <Views value={views.count} />
        </div>
    );
};

const Link = ({ name, value }) => {
    return (
        <label>
            <button className="btn py-5 px-5">{name}</button> {value}
        </label>
    );
};

const Views = ({ value }) => {
    return (
        <div className="views"><hr />
                View: {value}
        </div>
    );
};

export default Footer;
