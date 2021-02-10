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
import { getResponseData } from './util/response';

const getPostFunction = `${process.env.REACT_APP_POST_API}`;
const upVoteFunction = `${process.env.REACT_APP_UP_VOTE_API}`;
const downVoteFunction = `${process.env.REACT_APP_DOWN_VOTE_API}`;
const addCommentFunction = `${process.env.REACT_APP_ADD_COMMENT_API}`;
const addPostFunction = `${process.env.REACT_APP_ADD_POST_API}`;
const uploadFunction = `${process.env.REACT_APP_UPLOAD_API}`;
const registerUserFunction = `${process.env.REACT_APP_REGISTER_USER_API}`;
const loginUserFunction = `${process.env.REACT_APP_LOGIN_USER_API}`;

console.debug('get  post    api', getPostFunction);
console.debug('up   vote    api', upVoteFunction);
console.debug('down vote    api', downVoteFunction);
console.debug('add  comment api', addCommentFunction);
console.debug('add  post    api', addPostFunction);
console.debug('upload       api', uploadFunction);
console.debug('register     api', registerUserFunction);
console.debug('login        api', loginUserFunction);

if (!getPostFunction) {
    throw new Error('Post API URL not provided');
}

if (!upVoteFunction) {
    throw new Error('Up Vote API URL not provided');
}

if (!downVoteFunction) {
    throw new Error('Down Vote API URL not provided');
}

if (!addCommentFunction) {
    throw new Error('Add Comment API URL not provided');
}

if (!addPostFunction) {
    throw new Error('Add Post API URL not provided');
}

if (!uploadFunction) {
    throw new Error('Upload API URL not provided');
}

if (!registerUserFunction) {
    throw new Error('Register User API URL not provided');
}

if (!loginUserFunction) {
    throw new Error('Login User API URL not provided');
}

export default function App() {
    const location = useLocation();
    const background = location.state && location.state.background;

    const [user, setUser] = useState('');
    const [posts, setPosts] = useState([]);
    const [toptags] = useState(defaultTags);

    usePostData(setPosts);

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
        await updateComment(user, posts, postId, value, setPosts);
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
                    <Route exact path="/"
                        children={<Home
                            posts={posts}
                            toptags={toptags}
                            onCardAction={handlePostVotes} />} />

                    <Route path="/register" children={<Register />} />

                    <Route path="/login"
                        children={<Login onLogin={handleLogin} />} />

                    <Route path="/post"
                        children={<Post onPost={handlePost} />} />

                    <Route path="/search"
                        children={<Search onCardAction={handlePostVotes} />} />

                    <Route path="/detail/:postId/:title"
                        children={<Detail
                            posts={posts}
                            onAction={handlePostVotes}
                            onComment={handleComment} />} />

                    <Route children={<NotFound />} />
                </Switch>

                {background && <ModalRouter
                    onLogin={handleLogin}
                    onPost={handlePost}
                    onComment={handleComment} />}
            </main>
        </>
    );
}

const ModalRouter = ({ onLogin, onPost, onComment }) => {
    return (
        <Switch>
            <Route path="/register" children={
                <Modal children={<Register isModal={true} />} />} />

            <Route path="/login" children={
                <Modal children={<Login isModal={true} onLogin={onLogin} />} />} />

            <Route path="/post" children={
                <Modal children={<Post isModal={true} onPost={onPost} />} />} />

            <Route path="/comment/:postId" children={
                <Modal children={<Comment
                    className="comment box is-flex flex-column has-background-white py-3 px-2"
                    id="comment"
                    isModal={true}
                    onSend={onComment} />} />} />
        </Switch>
    );
};

const defaultTags = [
    "programing", "java", "html",
    "coding", "marketing", "cat",
    "dog", "mouse", "football",
    "css", "javascript",
];

const usePostData = (consumer) => {
    useEffect(() => {
        async function fetchPostData() {
            try {
                const response = await fetch(getPostFunction);
                let posts = await response.json();
                consumer(posts);
            } catch (ex) {
                console.error(ex.message, ex);
            }
        }
        fetchPostData();

    }, [consumer]);
};

const loginUser = async (user, consumer) => {
    try {
        const response = await fetch(loginUserFunction, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(user)
        });

        const result = await response.json();
        console.debug('# result ==> ', result);
        if (result && result.error) return { succeeded: false, errors: result };

        const { login } = result;
        consumer(login);

        return { succeeded: true, data: result };

    } catch (ex) {
        throw ex;
    }
};

const postVotes = async (e, user, upcb, downcb) => {
    const headers = { 'Content-Type': 'application/json' }

    if (user) headers['x-auth-token'] = user['access-token'];

    const { name, value, postId } = e.target;

    switch (name.toLowerCase()) {
        case 'like':
            await upcb(postId, value, headers);
            break;

        case 'dislike':
            await downcb(postId, value, headers);
            break;

        default:
            console.error('invalid action', name, value);
            break;
    }
};

const addComment = (posts, postId, comment, consumer) => {
    const postArray = [...posts];
    const selectedPostArray = postArray.filter(p => p._id === postId);

    if (selectedPostArray.length === 0) return;

    const selectedPost = selectedPostArray[0];
    const comments = [...selectedPost.comments];
    comments.push(comment);
    selectedPost.comments = comments;

    const index = postArray.indexOf(selectedPost);
    postArray[index] = selectedPost;

    consumer(postArray);
};

const createPost = async (user, posts, data, consumer) => {
    try {
        const encodedString = new URLSearchParams(data).toString();

        const response = await fetch(addPostFunction, {
            method: 'POST',
            mode: 'cors',
            headers: getPostHeaders(user),
            body: encodedString,
        });

        const result = await parsePostResponse(response);

        parsePostResult(result, {
            posts,
            consumer
        });

        return result;

    } catch (ex) {
        console.error(ex);
        throw ex;
    }
};

const addPost = (posts, post, consumer) => {
    const array = [...posts];
    array.push(post);
    consumer(array);
};

const getPostHeaders = (user) => {
    const headers = {
        Accept: 'application/json',
        'Content-Type': "application/x-www-form-urlencoded"
    };

    if (user) headers['x-auth-token'] = user['token'];
};

const parsePostResponse = async (response) => {
    if (!response.ok) {
        const data = await getResponseData(response);

        if (data && data.error) {
            return { succeeded: false, error: data.error };
        }

        console.debug('# error:', data);
        console.debug(response.statusText);
        throw new Error('Invalid server response', response);
    }

    const data = await getResponseData(response);
    return { succeeded: true, data };
};

const parsePostResult = (result, props) => {
    if (result.succeeded) {
        const { data } = result;
        const { posts, consumer } = props;
        addPost(posts, data, consumer);
    }
};

export const updateComment = async (user, posts, postId, comment, consumer) => {
    try {
        const headers = { 'Content-Type': 'application/json' };

        if (user) headers['x-auth-token'] = user['access-token'];

        const response = await fetch(addCommentFunction, {
            method: 'POST',
            mode: 'cors',
            headers,
            body: JSON.stringify({ text: comment, postId })
        });

        const result = await response.json();
        const status = Number(response.status);

        if (status === 200) addComment(posts, postId, result, consumer);

        else console.log('response', response);

        return status;
    }
    catch (ex) {
        throw ex;
    }
};

export const updateVotes = async (posts, postId, name, votes, headers, endPoint, consumer) => {
    const selectedPost = posts.filter(p => p._id === postId);

    if (!selectedPost || selectedPost.length === 0) {
        console.log('error post not found');
        return false;
    }

    const post = selectedPost[0];
    const index = posts.indexOf(post);

    try {
        const response = await fetch(endPoint, {
            method: 'POST',
            mode: 'cors',
            headers,
            body: JSON.stringify({ count: votes, postId }),
        })

        if (Number(response.status) !== 200) {
            console.error(await response.text(), response);
            return false;
        }

        post[name] = votes;
        posts[index] = post;

        consumer([...posts]);
        return votes;
    }
    catch (ex) {
        throw ex;
    }
};
