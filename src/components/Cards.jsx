import React from "react";

import Card from "./Card";

const Cards = (props) => {
    const { user, post } = props;

    return (
        <div className="cards">
            <Card user={user} post={post} />
        </div>
    );
}

export default Cards;
