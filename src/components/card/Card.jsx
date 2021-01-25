import React from 'react';

import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";

const Card = (props) => {
    return (
        <div className="card has-background-white py-3 px-3 box">
            <Header  {...props} />
            <Content {...props} />
            <Footer  {...props} />
        </div>
    );
}

export default Card;
