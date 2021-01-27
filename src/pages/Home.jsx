import React, { Fragment } from 'react';
import banner from '../assets/images/potw-banner.png';
import Cards from '../components/Cards';

export default function Home({ posts, toptags, onCardAction }) {
    return (
        <div className="home is-flex">
            <Suggestions />
            <Content posts={posts} onCardAction={onCardAction} />
            <Hashtags toptags={toptags} />
        </div>
    );
}

function Content(props) {
    const { posts, onCardAction } = props;

    if (!posts || posts.length === 0) return (
        <div className="home__content is-flex flex-column flex-grow is-content-centered">
            <span>So much empty</span>
        </div>
    );

    return (
        <section className="home__content is-flex flex-column flex-grow">
            <Fragment>
                <Search />
                <Filter />
                <Cards posts={posts} onAction={onCardAction} />
            </Fragment>
        </section>
    );
}

const Suggestions = () => {
    return (
        <div className="home__left">
            <p className="home__left__content has-background-white pt-4 px-3 box">Suggestions</p>
        </div>
    );
}

const Hashtags = (props) => {
    const { toptags } = props;

    return (
        <div className="home__right">
            <div className="home__right__content is-sticky">
                <div className="sidebar is-flex flex-column">
                    <div>
                        <p className="mb-5 title">Top Hashtags</p>
                        <div className="has-background-white box banner-container is-flex flex-column">
                            <p className="py-4 px-3 is-flex flex-wrap">
                                {toptags.map((tag, id) => <a className="tag" href="/" key={id}>{tag}</a>)}
                            </p>
                            <img width="300" alt="Tipestry post of the week event"
                                src={banner} />
                        </div>
                    </div>

                    <div className="policy box has-background-white py-3 px-3 is-flex flex-column">
                        <p>
                            <strong className="emphasis">© 2021 <em>Tipestry</em></strong> Faq Contact About Contests Privacy Policy
                        Tipestry Go White Paper Tipestry for Chrome Terms and Condition
                        </p>
                        <div>
                            <p>Follow Us on Social Media</p>
                            <div className="social pt-5 is-flex">
                                <p><a className="link" href="/">Facebook</a></p>
                                <p><a className="link" href="/">Twiter</a></p>
                                <p><a className="link" href="/">Youtube</a></p>
                                <p><a className="link" href="/">Telegram</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const Search = () => {
    return (
        <form>
            <div className="search has-background-white py-4 px-4 box">
                <div className="search__control">
                    <label htmlFor="query">Search</label>
                    <input className="input flex-grow"
                        id="query"
                        name="query"
                        type="text"
                        placeholder="Enter a URL or a Search" />
                </div>
                <input className="search__btn py-5 px-5" type="submit" value="load" />
            </div>
        </form>
    );
}

const Filter = () => {
    return (
        <div className="filter has-background-white box py-4 px-4">
            <div className="filter__control">
                <label>View</label>
                <button className="btn py-5 px-5">List</button>
                <button className="btn py-5 px-5">Preview</button>
            </div>

            <div className="filter__control">
                <label className="" htmlFor="filter-1">Sort</label>
                <select id="filter-1">
                    <option>Popular</option>
                    <option>Recent</option>
                </select>
            </div>

            <div className="filter__control left">
                <select className="">
                    <option>Now</option>
                    <option>Today</option>
                    <option>This Week</option>
                    <option>This Month</option>
                    <option>All Time</option>
                </select>
            </div>
        </div>
    );
}
