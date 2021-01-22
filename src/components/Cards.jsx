import React from "react";

import Card from "./Card";

const Cards = (props) => {
    const { posts } = props;

    const content = posts.map(post => <Card post={post} />);

    return (
        <div className="cards">
            {content}
        </div>
    );
}

export default Cards;
