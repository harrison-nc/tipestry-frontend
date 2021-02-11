import React from 'react';
import Cards from '../../components/Cards';

export default function Content({ posts, onCardAction }) {
    const className = "home__content is-flex flex-column flex-grow is-content-centered";

    return (
        <>
            {!posts || posts.length === 0
                ? <div className={className}> <span>So much empty</span></div>
                : <Cards posts={posts} onAction={onCardAction} />}
        </>
    );
}
