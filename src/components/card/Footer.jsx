import React from 'react';

const Footer = (props) => {
    const { post, onAction } = props;
    const { _id, upVotes, downVotes, comments, shares, views } = post;

    return (
        <div className="footer">
            <div className="control">
                <Link
                    postId={_id}
                    name="Like"
                    value={upVotes}
                    onClick={onAction} />

                <Link
                    postId={_id}
                    name="Dislike"
                    value={downVotes}
                    onClick={onAction} />

                <Link
                    postId={_id}
                    name="Comment"
                    value={comments && comments.length}
                    onClick={onAction} />

                <Link
                    postId={_id}
                    name="Share"
                    value={shares && shares.length}
                    onClick={onAction} />
            </div>
            <Views value={views && views.count} />
        </div>
    );
};

const Link = (props) => {
    const { postId, name, value, onClick } = props;

    function handleClick(e) {
        try {
            let newValue = Number(value);
            newValue++;
            e.target.name = name;
            e.target.value = newValue;
            e.target.postId = postId;
            onClick(e)
        }
        catch (ex) {
            console.error(ex);
        }
    }

    return (
        <label>
            <button className="btn py-5 px-5" onClick={handleClick}>{name}</button> {value}
        </label>
    );
};

const Views = ({ value }) => {
    return (
        <div className="views">
            <hr /> View: {value}
        </div>
    );
};

export default Footer;
