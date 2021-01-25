import React from "react";

import Card from "./card/Card";

const Cards = (props) => {
    const { posts, ...passThrough } = props;

    const content = posts.map((post, id) => <Card key={id} post={post} {...passThrough} />);

    return (
        <div className="cards is-flex flex-column">
            {content}
        </div>
    );
}

export default Cards;
