import React from 'react';

import Avatar from './Avatar';

const Header = ({ post, user }) => {
    const { title, tags } = post;

    return (
        <div className="header">
            <Avatar user={user} post={post} />
            <div className="container">
                <h2 className="subtitle">{title}</h2>
                <div className="tags">
                    {renderTags(tags)}
                </div>
            </div>
        </div>
    );
}

const renderTags = (tags) => {
    return tags.map((tag, key) => <span key={key}>{tag}</span>);
}

export default Header;
