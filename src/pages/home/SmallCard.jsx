import React from 'react';
import { Likes } from './card/Likes';
import { Resource } from './card/Resource';
import { Details } from "./card/Details";

export default function SmallCard({ post }) {
    return (
        <div className="small-card is-flex has-background-white box px-3 py-3">
            <Likes post={post} />
            <Resource post={post} />
            <Details post={post} />
        </div>
    );
}
