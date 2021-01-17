import './css/App.css';
import './css/minireset.min.css';

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
        }
    };

    render() {
        const { user, post } = this.state;

        return (
            <Fragment>
                <Navbar />
                <main>
                    <Suggestions />
                    <section>
                        <Search />
                        <Filter />
                        <Cards user={user} post={post} />
                    </section>
                    <Hashtags />
                </main>
            </Fragment>
        );
    }
}

function Suggestions() {
    return <div>Suggestions</div>
}

function Hashtags() {
    return <div>Top Hashtags</div>
}

export default App;
