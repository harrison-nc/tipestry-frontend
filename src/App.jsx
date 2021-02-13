import React, { useState } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';

import './assets/css/minireset.min.css';
import './assets/css/util.css';
import './assets/css/App.css';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Post from './pages/Post';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import Search from './pages/Search';
import Detail from './pages/Detail';
import usePosts from './hooks/usePosts.js';
import { Modals } from './modal/Modals';
import { upVoteFunction, downVoteFunction } from './startup/startup';
import { createPost } from './util/post';
import { defaultTags } from "./util/tags";
import { updateVotes, postVotes } from "./util/votes";
import { updateComment } from "./util/comment";
import { loginUser } from "./util/login";

export default function App() {
    const location = useLocation();
    const [user, setUser] = useState('');
    const [posts, setPosts] = usePosts(this);
    const [toptags] = useState(defaultTags);

    const background = location.state && location.state.background;

    const handleLogin = async (user) => {
        await loginUser(user, setUser);
    };

    const handlePost = async (e, upload = false) => {
        const { data } = e.target;

        if (!data) throw new Error('Invalid post form data');

        return createPost(user, posts, data, setPosts, upload);
    };

    const handleComment = async (e) => {
        const { postId, value } = e.target;
        const result = await updateComment(user, posts, postId, value);

        if (result.errors || result.errorMessage) {
            return result;
        }

        setPosts(result);
    };

    const handleUpVotes = async (postId, votes, headers) => {
        const name = 'upVotes';
        const endPoint = upVoteFunction;
        await updateVotes(posts, postId, name, votes, headers, endPoint, setPosts);
    };

    const handleDownVotes = async (postId, votes, headers) => {
        const name = 'downVotes'
        const endPoint = downVoteFunction;
        await updateVotes(posts, postId, name, votes, headers, endPoint, setPosts);
    };

    const handlePostVotes = async (e) => {
        await postVotes(e, user, handleUpVotes, handleDownVotes);
    };

    return (
        <>
            <Navbar loggedInUser={user} />
            <main className="main is-flex flex-column pt-3 px-4">
                <Switch location={background || location}>
                    <Route exact path="/">
                        <Home posts={posts} toptags={toptags} onCardAction={handlePostVotes} />
                    </Route>
                    <Route path="/register" children={<Register />} />
                    <Route path="/login" children={<Login onLogin={handleLogin} />} />
                    <Route path="/post" children={<Post onPost={handlePost} />} />
                    <Route path="/search" children={<Search onCardAction={handlePostVotes} />} />
                    <Route path="/detail/:postId/:title">
                        <Detail posts={posts} onAction={handlePostVotes}
                            onComment={handleComment} />
                    </Route>
                    <Route children={<NotFound />} />
                </Switch>
                {background &&
                    <Modals
                        toptags={toptags}
                        onLogin={handleLogin}
                        onPost={handlePost}
                        onComment={handleComment} />}
            </main>
        </>
    );
}
