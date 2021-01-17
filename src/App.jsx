import './css/App.css';
import './css/minireset.min.css';

import React, { Component } from 'react';

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
        return (
            <div className="main is-flex flex-column">
                <Navbar />
                <div className="container is-flex">
                    <div className="block">
                        <div className="panel has-background-white py-3 px-3">
                            Suggestions for you
                    </div>
                    </div>
                    <div className="is-flex flex-column">
                        <Search />
                        <Filter />
                        <Cards />
                    </div>
                    <div className="container">
                        <div className="panel has-background-white py-3 px-3">
                            Popular Hashtags
                    </div>
                    </div>
                </div>
            </div>
        );
    }

    renderSuggestions() {
        return <div>Suggestions</div>
    }
}

export default App;
