import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { updateVotes, postAddress } from '../App';
import banner from '../assets/images/potw-banner.png';
import Cards from '../components/Cards';

const Search = () => {
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

        const action = name === 'like' ? 'upVotes' :
            name === 'dislike' ? 'downVotes' : 'invalid';

        const endPoint = `${postAddress}/${postId}/${action}`;
        const headers = { 'Content-Type': 'application/json' };

        await updateVotes(matchingPosts, postId, name, value, headers, endPoint, setMatchingPosts);
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

export default Search;
