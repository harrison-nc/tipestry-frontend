import React from 'react';

import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";

const Card = (props) => {
    const { post } = props;

    return (
        <div className="card has-background-white py-3 px-3 box">
            <Header post={post} />
            <Content post={post} />
            <Footer post={post} />
        </div>
    );
}

export default Card;
