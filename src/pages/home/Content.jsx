import React from 'react';
import Cards from '../../components/card/Cards';

export default function Content({ posts }) {
    return (
        <div className="home__content columns flex-grow">
            <Cards posts={posts} />
        </div>
    );
}
