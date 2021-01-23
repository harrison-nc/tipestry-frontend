import React from 'react';

import Avatar from './Avatar';

const Header = ({ post }) => {
    const { title, tags } = post;

    let tagElements;

    if (tags) tagElements = tags.map((tag, key) => <span key={key}>#{tag}</span>);

    else tagElements = <span>empty tags</span>

    return (
        <div className="header">
            <Avatar post={post} />
            <div className="header__content is-flex flex-column">
                <h2 className="subtitle">{title}</h2>
                <div className="tags">
                    {tagElements}
                </div>
            </div>
        </div>
    );
}

export default Header;
