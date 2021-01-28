import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Card = (props) => {
    const { post } = props;

    return (
        <div className="card has-background-white box">
            <div className="card__content pt-3 px-3">
                <Header  {...props} />
                <Content {...props} />
                <Footer  {...props} />
            </div>
            <Views value={post && post.views} />
        </div>
    );
}

const Header = ({ post }) => {
    const { title, tags } = post;

    return (
        <div className="header">
            <Avatar post={post} />
            <div className="header__content is-flex flex-column py-6">
                <h1 className="title">{title}</h1>
                <div className="tags is-flex">
                    {tags && tags.map((tag, key) =>
                        <span className="tag has-text-link" key={key}>
                            #{tag}
                        </span>
                    )}

                    {!tags && <span>empty tags</span>}
                </div>
            </div>
        </div>
    );
}

const Content = (props) => {
    const { resourceUrl, description } = props.post;

    return (
        <div className="resource">
            <figure>
                <img alt="Resource" src={resourceUrl} />
                <figcaption>{description}</figcaption>
            </figure>
        </div>
    );
}

const Avatar = (props) => {
    const { post } = props;

    if (!post) return (<span>no avatar</span>);

    let { createdAt, user } = post;

    if (!user) user = { name: 'no user', avatarUrl: '' };

    const { name, avatarUrl } = user;

    function formatDate(date) {
        try {

            function format(today, date, type) {
                if (today === date) return false;
                else if (today > date) {
                    const number = today - date;
                    return `${number} ${type}s ago`;
                }
                else return type === 'hour' ? `an ${type} ago` : `a ${type} ago`;
            }

            const today = new Date();
            const dateCreated = new Date(date);

            const dateFormat =
                format(today.getFullYear(), dateCreated.getFullYear(), 'year')
                || format(today.getMonth(), dateCreated.getMonth(), 'month')
                || format(today.getDate(), dateCreated.getDate(), 'day')
                || format(today.getHours(), dateCreated.getHours(), 'hour')
                || format(today.getMinutes(), dateCreated.getMinutes(), 'minute')
                || format(today.getSeconds(), dateCreated.getSeconds(), 'second')

            console.log(dateFormat, dateCreated, today);

            return dateFormat;
        }
        catch (ex) {
            console.error(ex);
        }

        return '';
    }

    function formatDateString(date) {
        try {
            const value = new Date(date);
            return value.toUTCString();
        }
        catch (ex) {
            console.error(ex);
        }

        return date;
    }

    return (
        <div className="avatar">
            <img alt="user" src={avatarUrl} />
            <div>
                <p><span className="has-text-link">@{name}</span></p>
                <p>
                    <abbr className="date has-text-grey"
                        title={formatDateString(createdAt)} >
                        {formatDate(createdAt)}
                    </abbr>
                </p>
            </div>
        </div>
    );
}

const Footer = (props) => {
    const location = useLocation();
    const { post, onAction } = props;
    const { _id, upVotes, downVotes, comments, shares } = post;
    const postId = _id;

    const commentLink = {
        pathname: `/comment/${postId}`,
        state: { background: location }
    };

    return (
        <div className="footer">
            <Button postId={postId}
                name="Like"
                value={upVotes}
                onClick={onAction} />

            <Button postId={postId}
                name="Dislike"
                value={downVotes}
                onClick={onAction} />

            <div>
                <Link className="btn comment py-5 px-5" to={commentLink}>
                    Comment
                </Link>
                {comments && <span>{comments.length}</span>}
            </div>

            <Button postId={postId}
                name="Share"
                value={shares && shares.length}
                onClick={onAction} />
        </div >
    );
};

const Views = ({ value }) => {
    return (<div className="views px-5 py-4">View: {value || '10.1k'}</div>);
};

const Button = (props) => {
    const { postId, name, value, onClick } = props;

    function handleClick(e) {
        e.preventDefault();

        try {
            let newValue = Number(value);
            newValue++;
            e.target.name = name;
            e.target.value = newValue;
            e.target.postId = postId;
            onClick(e)
        }
        catch (ex) {
            console.error(ex);
        }
    }

    return (
        <div>
            <Link to="/" className="btn action py-5 px-5" onClick={handleClick}>
                {name}
            </Link>
            <span>{value}</span>
        </div>
    );
};

export default Card;
