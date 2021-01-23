import React from "react";

import Card from "./Card";

const Cards = (props) => {
    const { posts } = props;

    const content = posts.map((post, key) => <Card key={key} post={post} />);

    return (
        <div className="cards is-flex flex-column">
            {content}
        </div>
    );
}

export default Cards;
