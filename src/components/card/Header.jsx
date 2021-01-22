import React from 'react';

import Avatar from './Avatar';

const Header = ({ post }) => {
    const { title, tags, user } = post;

    let tagElements;
    if (tags) {
        tagElements = tags.map((tag, key) => <span key={key}>{tag}</span>);
    }
    else {
        tagElements = <span>no tags</span>
    }

    return (
        <div className="header">
            <Avatar user={user} post={post} />
            <div className="container">
                <h2 className="subtitle">{title}</h2>
                <div className="tags">
                    {tagElements}
                </div>
            </div>
        </div>
    );
}

export default Header;
