import './css/util.css';
import './css/App.css';
import './css/minireset.min.css';

import React, { Component, Fragment } from 'react';

import Hashtags from './components/Hashtags';
import Suggestions from './components/Suggestions';
import Register from './components/Register';
import LoginDialog from './components/LoginDialog';
import PostDialog from './components/PostDialog';
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

    registerAction = 'http://localhost:3000/api/users'

    handleRegister = async (user) => {
        try {
            const response = await fetch(this.registerAction, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
            })

            return await response.json();
        }
        catch (ex) {
            console.error(ex);
            // todo: process error and close the form
        }
    };

    render() {
        const { user, post, toptags } = this.state;

        return (
            <Fragment>
                <Navbar
                    registerAction={this.registerAction}
                    onRegister={this.handleRegister} />

                <main id="app" className="main is-flex pt-3 mt-1">
                    <Suggestions />
                    <section className="section">
                        <Search />
                        <Filter />
                        <Cards user={user} post={post} />
                    </section>
                    <Hashtags toptags={toptags} />
                </main>

                <Register
                    id="register"
                    onRegister={this.handleRegister} />

                <LoginDialog id="login-dialog" />
                <PostDialog id="post-dialog" />
            </Fragment>
        );
    }
}

export default App;
