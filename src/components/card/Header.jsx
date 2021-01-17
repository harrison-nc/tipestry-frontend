import React from 'react';

import Avatar from './Avatar.jsx';

function Header(props) {
    const hashtags = props.post.tags.map((tag, key) => {
        return <span key={key}>{tag}</span>
    });

    return (
        <div className="block">
            <Avatar user={props.user} post={props.post} />

            <div className="subtitle pt-3">
                {props.post.title}
            </div>

            <div className="block tags">
                {hashtags}
            </div>
        </div>
    );
}

export default Header;
