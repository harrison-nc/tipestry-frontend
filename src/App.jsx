import './css/App.css';
import './css/minireset.min.css';
import banner from './images/potw-banner.png';

import React, { Component, Fragment } from 'react';

import Navbar from './components/Navbar';
import Search from './components/Search';
import Filter from './components/Filter';
import Cards from './components/Cards';

class App extends Component {
    state = {
        user: {
            name: 'user@123',
            avatarUrl: "https://picsum.photos/50",
        },
        post: {
            title: "title",
            description: "A web resource image or video",
            resourceUrl: "https://via.placeholder.com/600x400",
            date: "1 week age",
            tags: ["#tag1", "#tag2", "#tag3"],
            likes: 11,
            disLikes: 3,
            comments: {
                count: 1,
            },
            shares: {
                count: 9,
            },
            views: {
                count: '11.1K'
            }
        },
        toptags: [
            "#programing", "#java", "#html",
            "#coding", "#marketing", "#cat",
            "#dog", "#mouse", "#football",
            "#css", "#javascript",
        ]
    };

    render() {
        const { user, post, toptags } = this.state;

        return (
            <Fragment>
                <Navbar />
                <main className="main pt-3 mt-1">
                    <Suggestions />
                    <section className="section">
                        <Search />
                        <Filter />
                        <Cards user={user} post={post} />
                    </section>
                    <Hashtags toptags={toptags} />
                </main>
            </Fragment>
        );
    }
}

function Suggestions() {
    return (
        <div className="container left flex-grow">
            <p className="has-background-white pt-4 px-3 box">Suggestions</p>
        </div>
    );
}

function Hashtags(props) {
    const { toptags } = props;

    return (
        <div className="container right flex-column no-gap flex-start flex-grow">
            Top Hashtags
            <div className="has-background-white box banner-container is-flex flex-column">
                <p className="py-4 px-3 is-flex flex-wrap">
                    {toptags.map((tag, id) => <a href="#" key={id}>{tag}</a>)}
                </p>
                <figure className="flex-grow banner">
                    <img width="300" alt="Tipestry post of the week event"
                        src={banner} />
                </figure>
            </div>
        </div>
    );
}

export default App;
