import React, { useContext } from "react";
import { ListViewContext } from "../../App";
import Empty from "../Empty";
import Card from "./Card";
import ListView from "./list/ListView";

const Cards = ({ posts }) => {
    const listView = useContext(ListViewContext);

    return (
        <div className="cards columns">
            {posts ? listView
                ? posts.map((post, id) => <ListView key={id} post={post} />)
                : posts.map((post, id) => <Card key={id} post={post} />)
                : <Empty />
            }
        </div>
    );
}

export default Cards;
