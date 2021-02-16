import React from 'react';
import { Link } from 'react-router-dom';
import { useCommentLink } from '../../../hooks/useCommentLink.js';
import { useNavigator } from '../../../hooks/useNavigator';
import { formatDate } from '../../../util/date-util';

export const Details = ({ post }) => {
    const { title, user, createdAt, tags, _id: postId } = post;
    const commentLink = useCommentLink(postId);
    const navigator = useNavigator();
    const style = { cursor: "pointer" };

    const handleClick = (e) => post && navigator.gotoPostDetail(postId, title);

    return (
        <div className="card__details is-flex flex-column">
            <h2 className="title" style={style} onClick={handleClick}>{title}</h2>
            <p className="content is-flex">
                <span className="has-text-link">@{user && user.name}</span>
                <span className="has-text-grey">{formatDate(createdAt)}</span>
                {tags && tags.map &&
                    tags.map((tag, i) => <span className="has-text-link" key={i}>#{tag}</span>)}
            </p>
            <p className="action is-flex">
                <Link to={commentLink}>comment</Link>
                <Link to="">share</Link>
            </p>
        </div>
    );
};
