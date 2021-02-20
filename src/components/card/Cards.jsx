import React, { useContext } from "react";
import { ListViewContext } from "../../App";
import Card from "./Card";
import ListView from "./list/ListView";

const Cards = ({ posts }) => {
    const listView = useContext(ListViewContext);

    return (
        <div className="cards is-flex flex-column">
            {posts && listView ?
                posts.map((post, id) => <ListView key={id} post={post} />)
                :
                posts.map((post, id) => <Card key={id} post={post} />)
            }
        </div>
    );
}

export default Cards;
