import React from 'react';
import Footer from './card/Footer';
import Header from './card/Header';
import Content from './card/Content';

export default function Card(props) {
    const { post } = props;

    return (
        <div className="card has-background-white box pb-3">
            <div className="card__content pt-3">
                <Header  {...props} />
                <Content {...props} />
                <Footer  {...props} />
            </div>
            {post && post.views && <Views value={post.views} />}
        </div>
    );
}

const Views = ({ value }) => {
    return (
        <div className="views px-4 pt-5">View: {value || '10.1k'}</div>
    );
};
