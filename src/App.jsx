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
import Comment from './components/modal/Comment';

const registerAction = 'http://localhost:3000/api/users'
const loginAction = 'http://localhost:3000/api/logins'
const postAction = 'http://localhost:3000/api/posts'

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

    componentDidMount = async () => {
        try {
            const response = await fetch(postAction);
            const posts = await response.json();

            this.setState({ posts });
        } catch (ex) {
            console.error(ex.message, ex);
        }
    };

    addPost = (post) => {
        const posts = [...this.state.posts];
        posts.push(post);

        this.setState({ posts });
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

    handlePost = async (post) => {
        try {
            const headers = { 'Content-Type': 'application/json' }

            if (this.state.user)
                headers['x-auth-token'] = this.state.user['access-token'];

            const response = await fetch(postAction, {
                method: 'POST',
                mode: 'cors',
                headers,
                body: JSON.stringify(post)
            });

            const result = await response.json();

            if (result.error) return result.error;

            else window.location.href = '#app';

            this.addPost(result);

            return true;

        } catch (ex) {
            throw ex;
        }
    };

    handleUpVotes = async (postId, votes, headers) => {
        const endPoint = `${postAction}/${postId}/upVotes`;
        await this.updateVotes(postId, 'upVotes', votes, headers, endPoint);
    };

    handleDownVotes = async (postId, votes, headers) => {
        const endPoint = `${postAction}/${postId}/downVotes`;
        await this.updateVotes(postId, 'downVotes', votes, headers, endPoint);
    };

    updateVotes = async (postId, name, votes, headers, endPoint) => {
        try {
            const payload = {};
            payload[name] = votes;

            const response = await fetch(endPoint, {
                method: 'POST',
                mode: 'cors',
                headers,
                body: JSON.stringify(payload),
            })

            if (Number(response.status) === 200) {
                const { posts } = this.state;
                const selectedPost = posts.filter(p => p._id === postId);

                if (!selectedPost || selectedPost.length === 0) return;

                const post = selectedPost[0];

                post[name] = votes;

                const index = posts.indexOf(post);
                posts[index] = post;

                this.setState({ posts });
            }
            else console.error(response);
        }
        catch (ex) {
            console.error(ex);
        }
    };

    handleComment = (postId) => {
        window.location.hash = '#post-comment';
    };

    handleUpdatePostComment = (e) => {

    };

    handleCardAction = async (e) => {
        const headers = { 'Content-Type': 'application/json' }

        if (this.state.user)
            headers['x-auth-token'] = this.state.user['access-token'];

        const { name, value, postId } = e.target;

        switch (name.toLowerCase()) {
            case 'like':
                await this.handleUpVotes(postId, value, headers);
                break;

            case 'dislike':
                await this.handleDownVotes(postId, value, headers);
                break;

            case 'comment':
                this.handleComment(postId);
                break;

            case 'share':
                console.log(name, value);
                break;
            default:
                console.error('invalid action', name, value);
                break;
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
                <Cards posts={posts} onAction={this.handleCardAction} />
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
                <Post id="post" onPost={this.handlePost} />

                <Comment id="post-comment" onSend={this.handleUpdatePostComment} />
            </Fragment>
        );
    }
}

export default App;
