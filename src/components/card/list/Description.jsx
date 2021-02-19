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

    const ucLink = { pathname: '/uc', state: { userId: user._id } };

    const handleClick = (e) => post && navigator.gotoPostDetail(postId, title);

    return (
        <div className="card__details is-flex flex-column">
            <h2 className="title" style={style} onClick={handleClick}>{title}</h2>

            <div className="content is-flex">
                <Link to={ucLink}>
                    <span className="has-text-link">@{user && user.name}</span>
                </Link>

                <span className="has-text-grey">{formatDate(createdAt)}</span>

                <ul className="tags">
                    {tags && tags.map && tags.map((tag, i) =>
                        <li className="has-text-link tag" key={i}>#{tag}</li>
                    )}
                </ul>
            </div>

            <div className="action is-flex">
                <Link to={commentLink}>comment</Link>
                <Link to="">share</Link>
            </div>
        </div>
    );
};
