import React from 'react';
import Avatar from "./Avatar";

export default function Header({ post }) {
    const { title, tags } = post;

    return (
        <div className="header px-3">
            <Avatar post={post} />
            <div className="header__content is-flex flex-column py-6">
                <h1 className="title">{title}</h1>
                <div className="tags is-flex">
                    {tags && tags.map((tag, key) => <span className="tag has-text-link" key={key}>
                        #{tag}
                    </span>
                    )}

                    {!tags && <span>empty tags</span>}
                </div>
            </div>
        </div>
    );
};
