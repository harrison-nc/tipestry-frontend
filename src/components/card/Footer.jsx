import React from 'react';

function Footer(props) {
    return (
        <div className="social">
            <div className="control">
                <label>
                    <button>Like</button> {props.likes}
                </label>
                <label>
                    <button>Dislike</button> {props.disLikes}
                </label>
                <label>
                    <button>Comment</button> {props.comments.count}
                </label>
                <label>
                    <button>Share</button> {props.shares.count}
                </label>
            </div>
            <div>
                View: {props.views.count}
            </div>
        </div>
    );
}

export default Footer;
