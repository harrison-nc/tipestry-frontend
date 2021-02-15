import Cards from '../components/Cards';
import Banner from '../components/Banner';
import { useSearchData } from '../hooks/useSearchData';

export default function Search({ posts }) {
    const [match] = useSearchData(posts);

    return (
        <div className="search is-flex px-3 pb-1">
            <div className="search__left sidebar">
                <div className="search__content"></div>
            </div>

            <div className="search__content is-flex flex-column">
                <header className="has-text-grey">
                    <h1 className="title is-bold">({match ? match.length : 0}) Search Results</h1>
                    <p>Top posts that matches your search</p>
                </header>
                <Cards posts={match} />
            </div>

            <div className="search__right">
                <Banner className="search__content is-sticky banner__container" />
            </div>
        </div>
    );
}
