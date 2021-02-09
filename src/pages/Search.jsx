import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { updateVotes } from '../App';
import banner from '../assets/images/potw-banner.png';
import Cards from '../components/Cards';

const upVoteFunction = `${process.env.REACT_APP_UP_VOTE_API}`;
const downVoteFunction = `${process.env.REACT_APP_DOWN_VOTE_API}`;

export default function Search() {
    const location = useLocation();
    const [matchingPosts, setMatchingPosts] = useState([]);

    useEffect(() => {
        let posts = location.state && location.state.posts;
        posts = JSON.parse(posts);

        if (!posts || !Array.isArray(posts)) posts = [];

        setMatchingPosts(posts);

    }, [location.state]);

    const handleVotes = async (e) => {
        const { value, postId } = e.target;
        let { name } = e.target;

        name = name.toLowerCase();
        const headers = { 'Content-Type': 'application/json' };

        switch (name) {
            case 'like':
                await updateVotes(
                    matchingPosts,
                    postId,
                    'upVotes',
                    value,
                    headers,
                    upVoteFunction,
                    setMatchingPosts);
                break;

            case 'dislike':
                await updateVotes(
                    matchingPosts,
                    postId,
                    'downVotes',
                    value,
                    headers,
                    downVoteFunction,
                    setMatchingPosts);
                break;
            default:
                throw new Error('Invalid action: ' + name);
        }
    };

    return (
        <div className="search is-flex px-3 pb-1">
            <div className="search__left sidebar">
                <div className="search__content"></div>
            </div>

            <div className="search__content is-flex flex-column">
                <header className="has-text-grey">
                    <h1 className="title is-bold">({matchingPosts ? matchingPosts.length : 0}) Search Results</h1>
                    <p>Top posts that matches your search</p>
                </header>
                <Cards posts={matchingPosts} onAction={handleVotes} />
            </div>

            <div className="search__right">
                <div className="search__content is-sticky banner-container">
                    <img width="100%" alt="Tipestry post of the week event" src={banner} />
                </div>
            </div>
        </div>
    );
}
