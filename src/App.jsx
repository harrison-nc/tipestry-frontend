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

    const handleRegister = async (user) => {
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
        await updateVotes(postId, 'upVotes', votes, headers, endPoint);
    };

    const handleDownVotes = async (postId, votes, headers) => {
        const endPoint = `${postAction}/${postId}/downVotes`;
        await updateVotes(postId, 'downVotes', votes, headers, endPoint);
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
            }
            else console.error(response);
        }
        catch (ex) {
            console.error(ex);
        }
    };

    const handleComment = (postId) => { };

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

            case 'comment':
                handleComment(postId);
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
                    <Route exact path="/" children={<Home posts={posts} toptags={toptags} onCardAction={handleCardAction} />} />
                    <Route path="/register" children={<Register onRegister={handleRegister} />} />
                    <Route path="/login" children={<Login onLogin={handleLogin} />} />
                    <Route path="/post" children={<Post onPost={handlePost} />} />
                    <Route children={<NotFound />} />
                </Switch>

                {background && <RegisterModal onRegister={handleRegister} />}
                {background && <LoginModal onLogin={handleLogin} />}
                {background && <PostModal onPost={handlePost} />}
            </main>
        </>
    );
}

const RegisterModal = ({ onRegister }) => {
    return (
        <Route path="/register" >
            <Modal>
                <Register isModal={true} onRegister={onRegister} />
            </Modal>
        </Route>
    );
};

const LoginModal = ({ onLogin }) => {
    return (
        <Route path="/login" >
            <Modal>
                <Login isModal={true} onLogin={onLogin} />
            </Modal>
        </Route>
    );
};

const PostModal = ({ onPost }) => {
    return (
        <Route path="/post" >
            <Modal>
                <Post isModal={true} onPost={onPost} />
            </Modal>
        </Route>
    );
};
