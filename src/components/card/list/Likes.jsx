import React from 'react';
import { usePost } from '../../../hooks/usePosts';
import { useUser } from '../../../hooks/useUser';

export const Likes = ({ post }) => {
    const { _id: postId, upVotes, downVotes, } = post;
    const dispatch = usePost(postId)[1];
    const [user] = useUser();

    const votes = (Number(upVotes) || 0) - (Number(downVotes) || 0);
    const inc = (value) => (Number(value) || 0) + 1;

    const like = (event) => {
        event.preventDefault();
        dispatch({
            user: user,
            type: "UP_VOTE",
            votes: inc(upVotes)
        });
    }

    const disLike = (event) => {
        event.preventDefault();
        dispatch({
            user: user,
            type: "DOWN_VOTE",
            votes: inc(downVotes)
        });
    }

    return (
        <div className="likes is-flex flex-column">
            <a href="/" onClick={like}>Like</a>
            <span>{votes}</span>
            <a href="/" onClick={disLike}>dislike</a>
        </div>
    );
};
