import React from 'react';

function Footer(props) {
    const { likes, disLikes, comments, shares, views } = props;

    return (
        <div className="footer">
            <div className="control">
                <label>
                    <button>Like</button> {likes}
                </label>
                <label>
                    <button>Dislike</button> {disLikes}
                </label>
                <label>
                    <button>Comment</button> {comments.count}
                </label>
                <label>
                    <button>Share</button> {shares.count}
                </label>
            </div>
            <div>
                View: {views.count}
            </div>
        </div>
    );
}

export default Footer;
