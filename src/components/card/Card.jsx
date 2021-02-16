import React from 'react';
import Footer from './Footer';
import Header from './Header';
import Content from './Content';

export default function Card(props) {
    const { post } = props;

    return (
        <div className="card has-background-white box pb-3">
            <div className="card__content pt-3">
                <Header post={post} />
                <Content post={post} />
                <Footer post={post} />
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
