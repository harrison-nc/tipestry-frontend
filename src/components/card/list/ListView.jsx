import React from 'react';
import { Likes } from './Likes';
import { Resource } from './Resource';
import { Details } from "./Description";

export default function ListView({ post }) {
    return (
        <div className="list-view is-flex has-background-white box px-3 py-3">
            <Likes post={post} />
            <Resource post={post} />
            <Details post={post} />
        </div>
    );
}
