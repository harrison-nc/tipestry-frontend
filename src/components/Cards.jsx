import React from "react";
import SmallCard from "../pages/home/SmallCard";

import Card from "./Card";

const Cards = (props) => {
    const { posts, onAction, listView } = props;

    return (
        <div className="cards is-flex flex-column">
            {
                posts && listView ?

                    posts.map((post, id) => <SmallCard key={id} post={post} onAction={onAction} />)

                    :

                    posts.map((post, id) => <Card key={id} post={post} onAction={onAction} />)
            }
        </div>
    );
}

export default Cards;
