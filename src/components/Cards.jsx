import React from "react";

import Card from "./Card";

const Cards = (props) => {
    const { posts, onAction } = props;

    return (
        <div className="cards is-flex flex-column">{posts &&
            posts.map((post, id) => <Card key={id} post={post} onAction={onAction} />)}
        </div>
    );
}

export default Cards;
