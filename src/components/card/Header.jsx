import React from 'react';

import Avatar from './Avatar.jsx';

function Header({ post, user }) {
    const { title, tags } = post;

    return (
        <div className="block">
            <Avatar user={user} post={post} />

            <h2 className="subtitle pt-3">{title}</h2>

            <div className="block tags">
                {renderTags(tags)}
            </div>
        </div>
    );
}

function renderTags(tags) {
    return tags.map((tag, key) => <span key={key}>{tag}</span>);
}

export default Header;
