import { useLocation } from 'react-router-dom';
import banner from '../assets/images/potw-banner.png';
import Cards from '../components/Cards';

const Search = () => {
    const location = useLocation();
    let posts = location.state && location.state.posts;

    posts = JSON.parse(posts);

    if (!posts || !Array.isArray(posts)) posts = [];

    return (
        <div className="search is-flex px-3">
            <div className="search__left sidebar">
                <div className="search__content"></div>
            </div>

            <div className="search__content is-flex flex-column">
                <header className="has-text-grey">
                    <h1 className="title is-bold">({posts ? posts.length : 0}) Search Results</h1>
                    <p>Top posts that matches your search</p>
                </header>
                <Cards posts={posts} />
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
