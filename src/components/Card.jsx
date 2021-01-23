import React from 'react';

import Content from "./card/Content";
import Footer from "./card/Footer";
import Header from "./card/Header";

const Card = (props) => {
    const { post } = props;

    const { description, resourceUrl, likes, disLikes, comments, shares, views, } = post;

    return (
        <div className="card has-background-white py-3 px-3 box">
            <Header post={post} />

            <Content description={description} resourceUrl={resourceUrl} />

            <Footer likes={likes}
                disLikes={disLikes}
                comments={comments}
                shares={shares}
                views={views} />
        </div>
    );
}

export default Card;
