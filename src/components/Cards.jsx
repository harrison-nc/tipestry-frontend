import Card from "./Card";

import React from "react";

function Cards(props) {
    const { user, post } = props;

    return (
        <div className="box">
            <Card user={user} post={post} />
        </div>
    );
}

export default Cards;
