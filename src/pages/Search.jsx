import Cards from '../components/card/Cards';
import Banner from '../components/Banner';
import { useSearchData } from '../hooks/useSearchData';
import { useContext } from 'react';
import { PostData } from '../hooks/usePosts';

export default function Search() {
    const posts = useContext(PostData);
    const [state, isSearching] = useSearchData(posts);

    return (
        <div className="search rows px-3 pb-1">
            <div className="search__left sidebar">
                <div className="search__content"></div>
            </div>

            <div className="search__content columns">
                {isSearching ?
                    <div>
                        <h1 className="title">Searching</h1>
                        <p>Please wait...</p>
                    </div>
                    :
                    <>
                        <header className="has-text-grey">
                            <h1 className="title is-bold">({state ? state.length : 0}) Search Results</h1>
                            <p>Top posts that matches your search</p>
                        </header>
                        <Cards posts={state} />
                    </>
                }
            </div>

            <div className="search__right">
                <Banner className="search__content is-sticky banner__container" />
            </div>
        </div>
    );
}
