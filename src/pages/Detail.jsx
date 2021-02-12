import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import banner from '../assets/images/potw-banner.png';
import SocialLinks from '../components/card/SocialLink';
import Comment from '../components/Comment';
import { formatDate } from '../util/date-util';

export default function Detail({ posts, onAction, onComment }) {
    const location = useLocation();
    const [currentPost, setCurrentPost] = useState([]);

    const postId = location.state && location.state.postId;

    useEffect(() => {
        const selectedPosts = posts.filter(p => p._id === postId);

        if (!selectedPosts) return;

        const post = selectedPosts[0];
        setCurrentPost(post);

    }, [location.state, postId, posts]);

    if (!currentPost) return (
        <div className="detail">
            <div className="detail__content">
                <span>No was post selected</span>
            </div>
        </div>
    );

    let { title, user, createAt, tags, resourceUrl, description } = currentPost;

    if (!user) user = { name: 'no user', avatar: '' };

    const { name } = user;

    return (
        <div className="detail is-flex pb-1">
            <div className="is-flex flex-column detail__content">
                <div className="resource box has-background-white is-flex flex-column">
                    <header className="is-flex flex-column px-4 py-4">
                        <h1 className="title is-bold">{title}</h1>
                        <p className="is-flex profile has-text-grey">
                            <span>posted by</span>
                            <span className="user has-text-link-dark">@{name}</span>
                            <span className="time">{formatDate(createAt)}</span>
                        </p>
                    </header>
                    <img alt="resource" src={resourceUrl} />
                </div>

                <div className="detail__container is-flex">
                    <div className="tags-social-comment is-flex flex-column">
                        <div className="tag__container box has-background-white is-flex flex-column px-4 py-4">
                            <div className="tags is-flex">
                                {tags && tags.map((tag, key) =>
                                    <span key={key} className="tag has-text-link-dark">
                                        #{tag}
                                    </span>)}
                            </div>
                            <p>{description}</p>
                        </div>

                        <SocialLinks
                            className="social box is-flex has-background-white px-4"
                            post={currentPost}
                            onAction={onAction} />

                        <Comment
                            className="comment box is-flex flex-column has-background-white py-3 px-2"
                            id="comment"
                            onSend={onComment} />
                    </div>
                    <div className="banner__container">
                        <img alt="banner" src={banner} />
                    </div>
                </div>
            </div>
        </div>
    );
}
