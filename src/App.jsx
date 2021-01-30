import React, { useState, useEffect } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';

import './assets/css/minireset.min.css';
import './assets/css/util.css';
import './assets/css/App.css';
import Home from './pages/Home';
import Modal from './modal/Modal';
import Register from './pages/Register';
import Login from './pages/Login';
import Post from './pages/Post';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import Comment from './components/Comment';
import Search from './pages/Search';
import Detail from './pages/Detail';

const registerAction = 'http://localhost:3000/api/users'
const loginAction = 'http://localhost:3000/api/logins'
const postAction = 'http://localhost:3000/api/posts'

const defaultTags = [
    "#programing", "#java", "#html",
    "#coding", "#marketing", "#cat",
    "#dog", "#mouse", "#football",
    "#css", "#javascript",
];

export default function App() {
    const location = useLocation();
    const background = location.state && location.state.background;

    const [user, setUser] = useState('');
    const [posts, setPosts] = useState([]);
    const [toptags] = useState(defaultTags);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(postAction);
                const posts = await response.json();
                setPosts(posts);
            } catch (ex) {
                console.error(ex.message, ex);
            }
        }
        fetchData();
    }, []);

    const addPost = (post) => {
        const array = [...posts];
        array.push(post);
        setPosts(array);
    };

    const addComment = (postId, comment) => {
        const postArray = [...posts];
        const selectedPostArray = postArray.filter(p => p._id === postId);

        if (selectedPostArray.length === 0) return;

        const selectedPost = selectedPostArray[0];
        const comments = [...selectedPost.comments];
        comments.push(comment);
        selectedPost.comments = comments;

        const index = postArray.indexOf(selectedPost);
        postArray[index] = selectedPost;

        setPosts(postArray);
    };

    const handleLogin = async (user) => {
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

            result.loggedIn = true;

            const { login } = result;

            setUser(login);

            return true;

        } catch (ex) {
            throw ex;
        }
    };

    const handlePost = async (post) => {
        try {
            const headers = { 'Content-Type': 'application/json' }

            if (user) headers['x-auth-token'] = user['access-token'];

            const response = await fetch(postAction, {
                method: 'POST',
                mode: 'cors',
                headers,
                body: JSON.stringify(post)
            });

            const result = await response.json();

            if (result.error) return result.error;

            addPost(result);

            return true;

        } catch (ex) {
            throw ex;
        }
    };

    const handleUpVotes = async (postId, votes, headers) => {
        const endPoint = `${postAction}/${postId}/upVotes`;
        return updateVotes(postId, 'upVotes', votes, headers, endPoint);
    };

    const handleDownVotes = async (postId, votes, headers) => {
        const endPoint = `${postAction}/${postId}/downVotes`;
        return updateVotes(postId, 'downVotes', votes, headers, endPoint);
    };

    const updateVotes = async (postId, name, votes, headers, endPoint) => {
        try {
            const response = await fetch(endPoint, {
                method: 'POST',
                mode: 'cors',
                headers,
                body: JSON.stringify({ [name]: votes }),
            })

            if (Number(response.status) === 200 && posts) {
                const postArray = [...posts];

                const selectedPost = postArray.filter(p => p._id === postId);

                if (!selectedPost || selectedPost.length === 0) return;

                const post = selectedPost[0];
                post[name] = votes;

                const index = postArray.indexOf(post);
                postArray[index] = post;

                setPosts(postArray);

                return postArray;
            }
            else console.error(response);
        }
        catch (ex) {
            console.error(ex);
        }

        return [];
    };

    const handleComment = async (e) => {
        try {
            const { postId, value } = e.target;

            const headers = { 'Content-Type': 'application/json' };

            if (user) headers['x-auth-token'] = user['access-token'];

            const response = await fetch(`${postAction}/${postId}/comments`, {
                method: 'POST',
                mode: 'cors',
                headers,
                body: JSON.stringify({ text: value, postId })
            });

            const result = await response.json();
            const status = Number(response.status);

            if (status === 200) addComment(postId, result);

            else console.log('response', response);

            return status;
        }
        catch (ex) {
            console.error(ex);
        }
    };

    const handleCardAction = async (e) => {
        const headers = { 'Content-Type': 'application/json' }

        if (user) headers['x-auth-token'] = user['access-token'];

        const { name, value, postId } = e.target;

        switch (name.toLowerCase()) {
            case 'like':
                await handleUpVotes(postId, value, headers);
                break;

            case 'dislike':
                await handleDownVotes(postId, value, headers);
                break;

            case 'share':
                console.log(name, value);
                break;

            default:
                console.error('invalid action', name, value);
                break;
        }
    };

    return (
        <>
            <Navbar loggedInUser={user} />
            <main className="main is-flex flex-column pt-3 px-4">
                <Switch location={background || location}>
                    <Route exact path="/" >
                        <Home
                            posts={posts}
                            toptags={toptags}
                            onCardAction={handleCardAction} />
                    </Route>
                    <Route path="/register" children={<Register onRegister={registerUser} />} />
                    <Route path="/login" children={<Login onLogin={handleLogin} />} />
                    <Route path="/post" children={<Post onPost={handlePost} />} />
                    <Route path="/search" children={<Search />} />
                    <Route path="/detail/:postId/:title" children={<Detail
                        onAction={handleCardAction}
                        onComment={handleComment} />} />
                    <Route children={<NotFound />} />
                </Switch>

                {background && <ModalRouter
                    onRegister={registerUser}
                    onLogin={handleLogin}
                    onPost={handlePost}
                    onComment={handleComment}
                />}
            </main>
        </>
    );
}

const ModalRouter = ({ onLogin, onPost, onComment }) => {
    return (
        <Switch>
            <Route path="/register" >
                <Modal children={<Register isModal={true} />} />
            </Route>

            <Route path="/login" >
                <Modal children={<Login isModal={true} onLogin={onLogin} />} />
            </Route>

            <Route path="/post" >
                <Modal children={<Post isModal={true} onPost={onPost} />} />
            </Route>

            <Route path="/comment/:postId">
                <Modal children={<Comment
                    className="comment box is-flex flex-column has-background-white py-3 px-2"
                    id="comment"
                    isModal={true}
                    onSend={onComment} />} />
            </Route>
        </Switch>
    );
};

export const findPostsMatchingQuery = async (query) => {
    const endPoint = `${postAction}/search/${query}`;

    try {
        const response = await fetch(endPoint, {
            method: 'GET',
            mode: 'cors'
        });

        if (!Number(response.status) === 200) return [];

        return await response.json();
    }
    catch (ex) {
        console.error(ex);
    }

    return [];
}

export const registerUser = async (user) => {
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
