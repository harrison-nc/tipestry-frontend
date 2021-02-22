import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SocialLinks from '../components/card/SocialLinks';
import Comment from '../components/Comment';
import { formatDate } from '../util/date-util';
import Banner from '../components/Banner';
import { PostData } from '../hooks/usePosts';

export default function Detail() {
    const posts = useContext(PostData);
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
        <div className="detail detail__empty rows">
            <div className="detail__content">
                <span>No was post selected</span>
            </div>
        </div>
    );

    let { title, user, createAt, tags, resourceUrl, description } = currentPost;

    if (!user) user = { name: 'no user', avatar: '' };

    const { name } = user;

    return (
        <div className="detail rows pb-1">
            <div className="columns detail__content">
                <div className="resource box has-background-white columns">
                    <header className="columns px-4 py-4">
                        <h1 className="title is-bold">{title}</h1>
                        <p className="rows profile has-text-grey">
                            <span>posted by</span>
                            <span className="user has-text-link-dark">@{name}</span>
                            <span className="time">{formatDate(createAt)}</span>
                        </p>
                    </header>
                    <img alt="resource" src={resourceUrl} />
                </div>

                <div className="detail__container rows">
                    <div className="tags-social-comment columns">
                        <div className="tag__container box has-background-white columns px-4 py-4">
                            <div className="tags rows">
                                {tags && tags.map((tag, key) =>
                                    <span key={key} className="tag has-text-link-dark">
                                        #{tag}
                                    </span>)}
                            </div>
                            <p>{description}</p>
                        </div>

                        <SocialLinks
                            className="social box rows has-background-white px-4"
                            post={currentPost} />

                        <Comment
                            className="comment box columns has-background-white py-3 px-2" />

                        <Banner className="detail__banner__container" />

                        {currentPost && currentPost.comments &&
                            currentPost.comments.map((comment, i) => (
                                <div key={i}
                                    className="comments has-background-white box px-3 py-4">
                                    <p className="user has-text-link">@{comment.user.name}</p>
                                    <p className="comment-text">{comment.text}</p>
                                    <div className="action">
                                        <p className="links">
                                            <button href="/">like</button>
                                            <span>
                                                {Math.abs(
                                                    (Number(comment.upVotes) || 0)
                                                    -
                                                    (Number(comment.downVotes) || 0)
                                                )}
                                            </span>
                                            <button href="/">dislike</button>
                                        </p>
                                        <p className="date-created has-text-grey">
                                            {formatDate(comment.createdAt)}
                                        </p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <Banner className="banner__container" />
                </div>
            </div>
        </div>
    );
}
