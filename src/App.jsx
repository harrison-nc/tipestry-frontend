import './css/util.css';
import './css/App.css';
import './css/minireset.min.css';
import banner from './images/potw-banner.png';

import React, { Component, Fragment } from 'react';

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

const Suggestions = () => {
    return (
        <div className="aside container left">
            <p className="aside-content has-background-white pt-4 px-3 box">Suggestions</p>
        </div>
    );
}

const Hashtags = (props) => {
    const { toptags } = props;

    return (
        <div className="aside container right">
            <div className="aside-content">
                <div className="aside-fixed is-flex flex-column">
                    <div>
                        <p>Top Hashtags</p>
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

export default App;
