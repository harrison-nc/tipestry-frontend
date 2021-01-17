import Card from "./Card";

import React from "react";

function Cards(props) {
    const { user, post } = props;

    return (
        <div className="cards">
            <Card user={user} post={post} />
        </div>
    );
}

export default Cards;
