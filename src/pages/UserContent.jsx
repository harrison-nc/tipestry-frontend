import React, { useEffect, useRef, useState } from 'react';
import Cards from '../components/card/Cards';
import { Link, Route, Switch, useLocation, useRouteMatch } from 'react-router-dom';
import { getPosts } from '../data/user';
import { useNavigator } from '../hooks/useNavigator';

export default function UserContent(props) {
    const location = useLocation();
    const userId = location.state && location.state.userId;
    const { path, url } = useRouteMatch();
    const posts = useUserPost(userId);

    const createLink = (path) => {
        return { pathname: `${url}/${path}`, state: { userId } };
    };

    return (
        <div className="user-content is-flex flex-column px-2">
            <div className="header"></div>

            <div className="menu is-flex has-background-link px-3">
                <Link className="has-text-white" to={createLink('posts')}>Posts</Link>
                <Link className="has-text-white" to={createLink('comments')}>Comments</Link>
            </div>

            <Switch>
                <Route exact path={path} component={LandingPage} />
                <Route path={`${path}/posts`} children={<Posts posts={posts} />} />
                <Route path={`${path}/comments`} children={<Comments />} />
            </Switch>
        </div>
    );
}

const LandingPage = () => {
    return (
        <div className="landing">
            <h1>Getting user data.</h1>
            <p>Please wait...</p>
        </div>
    );
};

const Posts = ({ posts }) => {
    return (
        <div className="posts is-flex">
            <Cards posts={posts} />
        </div>
    );
};

const Comments = ({ posts }) => {
    return (
        <div>Comments by user</div>
    );
};

function useUserPost(userId) {
    const [posts, setPosts] = useState([]);
    const navigator = useNavigator();
    const navRef = useRef();

    useEffect(() => {
        navRef.current = navigator;
    });

    useEffect(() => {
        async function fetchPost() {
            try {

                if (!userId)
                    throw new Error('User id required');

                const posts = await getPosts(userId);
                setPosts(posts.data);

                if (navRef.current) {
                    navRef.current.gotoUserPosts(userId);
                }

            } catch (error) {
                console.error(error);
                setPosts([]);
            }
        }

        fetchPost();

    }, [userId]);

    return posts;
}
