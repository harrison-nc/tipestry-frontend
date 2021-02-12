import React from 'react';
import { Link } from 'react-router-dom';
import { useCommentLink } from '../../hooks/useCommentLink';
import { useNavigator } from '../../hooks/useNavigator';
import { formatDate } from '../../util/date-util';

export default function SmallCard(props) {
    const { post, onAction } = props;

    return (
        <div className="small-card is-flex has-background-white box px-3 py-3">
            <Likes post={post} onAction={onAction} />
            <Resource post={post} />
            <Details post={post} />
        </div>
    );
}

const Likes = ({ post, onAction }) => {
    const { upVotes, downVotes, _id: postId } = post;

    function handleClick(e) {
        e.preventDefault();

        const name = e.target.name;
        const value = name === 'like' ? upVotes :
            name === 'dislike' ? downVotes : NaN;

        if (isNaN(value)) throw new Error('Invalid action');

        try {
            let newValue = Number(value) + 1;
            e.target.name = name;
            e.target.value = newValue;
            e.target.postId = postId;
            onAction(e)
        }
        catch (ex) {
            console.error(ex);
        }
    }

    return (
        <div className="likes is-flex flex-column">
            <a href="/" name="like" onClick={handleClick}>Like</a>
            <span>
                {Math.abs(Number(downVotes) - Number(upVotes))}
            </span>
            <a href="/" name="dislike" onClick={handleClick}>dislike</a>
        </div>
    );
}

const Resource = ({ post }) => {
    const navigator = useNavigator();
    const { resourceUrl, _id: postId, title } = post;
    const style = { cursor: "pointer" };

    const handleClick = (e) => post && navigator.gotoPostDetail(postId, title);

    return (
        <div className="resource">
            <img
                style={style}
                width="72px"
                height="72px"
                src={resourceUrl}
                alt="resource"
                onClick={handleClick} />
        </div>
    );
};

const Details = ({ post }) => {
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
                    tags.map((tag, i) => <span className="has-text-link" key={i}>#{tag}</span>)
                }
            </p>
            <p className="action is-flex">
                <Link to={commentLink}>comment</Link>
                <Link to="">share</Link>
            </p>
        </div>
    );
};
