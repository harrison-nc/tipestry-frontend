import './css/util.css';
import './css/App.css';
import './css/minireset.min.css';

import React, { Component, Fragment } from 'react';

import Hashtags from './components/Hashtags';
import Suggestions from './components/Suggestions';
import Register from './components/Register';
import Login from './components/Login';
import Post from './components/Post';
import Navbar from './components/Navbar';
import Search from './components/Search';
import Filter from './components/Filter';
import Cards from './components/Cards';

const registerAction = 'http://localhost:3000/api/users'
const loginAction = 'http://localhost:3000/api/logins'

class App extends Component {
    state = {
        user: '',
        posts: [],
        toptags: [
            "#programing", "#java", "#html",
            "#coding", "#marketing", "#cat",
            "#dog", "#mouse", "#football",
            "#css", "#javascript",
        ]
    };

    updateLoginUser = (newUser) => {
        const user = { ...newUser.login };

        this.setState({ user });

        console.log(this.state);
    };

    handleRegister = async (user) => {
        try {
            const response = await fetch(registerAction, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
            })

            return response.json();
        }
        catch (ex) {
            throw ex;
        }
    };

    handleLogin = async (user) => {
        try {
            const response = await fetch(loginAction, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
            });

            const result = await response.json();

            if (result.error) return result;

            else window.location.href = '#app';

            result.loggedIn = true;

            this.updateLoginUser(result);

            return true;

        } catch (ex) {
            throw ex;
        }
    };

    render() {
        const { user, posts, toptags } = this.state;

        let content;

        if (!posts || posts.length === 0) content = <span>So much empty</span>;

        else content = (
            <Fragment>
                <Search />
                <Filter />
                <Cards posts={posts} />
            </Fragment>
        );

        return (
            <Fragment>
                <Navbar loggedInUser={user} />

                <main id="app" className="main is-flex pt-3 mt-1">
                    <Suggestions />

                    <section className="section flex-grow">
                        {content}
                    </section>

                    <Hashtags toptags={toptags} />
                </main>

                <Register id="register" onRegister={this.handleRegister} />
                <Login id="login" onLogin={this.handleLogin} />
                <Post id="post" />
            </Fragment>
        );
    }
}

export default App;
