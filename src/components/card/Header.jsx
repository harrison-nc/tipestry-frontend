import React from 'react';

import Avatar from './Avatar';

function Header({ post, user }) {
    const { title, tags } = post;

    return (
        <div className="header">
            <Avatar user={user} post={post} />

            <h2 className="subtitle">{title}</h2>

            <div className="tags">
                {renderTags(tags)}
            </div>
        </div>
    );
}

function renderTags(tags) {
    return tags.map((tag, key) => <span key={key}>{tag}</span>);
}

export default Header;
