import React from 'react';

import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";

const Card = (props) => {
    const { post } = props;
    const { description, resourceUrl } = post;
    const { likes, disLikes, comments, shares, views } = post;

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
