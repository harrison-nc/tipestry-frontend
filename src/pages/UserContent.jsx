import React, { useEffect, useRef, useState } from 'react';
import Cards from '../components/card/Cards';
import { Link, Route, Switch, useLocation, useRouteMatch } from 'react-router-dom';
import { getPosts } from '../data/user';
import { useNavigator } from '../hooks/useNavigator';

export default function UserContent() {
    const { path, url } = useRouteMatch();
    const location = useLocation();
    const user = location.state && location.state.user;
    const posts = useUserPost(user);

    return (
        <div className="user-content columns px-2">
            <Header user={user} url={url} />
            <Switch>
                <Route exact path={path} component={LandingPage} />
                <Route path={`${path}/posts`} children={<Posts posts={posts} />} />
                <Route path={`${path}/comments`} children={<Comments />} />
            </Switch>
        </div>
    );
}

const Header = ({ user, url }) => {
    return (
        <div className="header columns">
            <div className="top rows py-4 px-4">
                <div className="userd columns">
                    <span>{user.name}</span>
                    <span className="email">{user.email}</span>
                </div>
                <img className="avatar" src={user.avatarUrl} alt="avatar" />
            </div>
            <Menu target={url} user={user} />
        </div>
    );
};

const LandingPage = () => {
    const waiting = useRef();

    useEffect(() => {
        if (waiting.current) {
            const id = setInterval(() => {
                let text = waiting.current.innerHTML;
                text = text === '....' ? "" : (text + ".");
                waiting.current.innerHTML = text;

            }, 350);
            return () => clearInterval(id);
        }
    });

    return (
        <div className="landing">
            <h1>Getting user data.</h1>
            <p>Please wait<span ref={waiting}></span></p>
        </div>
    );
};

const Posts = ({ posts }) => {
    return (
        <div className="posts rows">
            <Cards posts={posts} />
        </div>
    );
};

const Comments = ({ posts }) => {
    return (
        <div>Comments by user</div>
    );
};

const Menu = ({ target, user }) => {
    const links = useMenuLinks();
    const [selected, setSelected] = useState(0);

    const handleSelect = id => {
        setSelected(id);
    };

    return (
        <div className="menu rows has-background-link px-3">
            {links.map((link, id) =>
                <MenuItem
                    id={id}
                    key={id}
                    text={link.text}
                    path={link.path}
                    target={target}
                    user={user}
                    selected={selected}
                    onClick={handleSelect}
                />)
            }
        </div>
    );
};

const MenuItem = ({ id, text, path, target, user, selected, onClick }) => {
    const link = { pathname: `${target}/${path}`, state: { user } }

    return (
        <Link
            id={id}
            to={link}
            onClick={(e) => onClick(id)}
            className={"has-text-white menu__item" + (selected === id ? " selected" : "")}>
            <span className="text">{text}</span>
            <span className="border"></span>
        </Link>
    );
};

function useMenuLinks() {
    const createLink = (text, path = text) => ({ text, path });

    const links = [
        createLink('posts'),
        createLink('comments')
    ];

    return useState(links)[0];
};

function useUserPost(user) {
    const [posts, setPosts] = useState([]);
    const navigator = useNavigator();
    const navRef = useRef();

    useEffect(() => {
        navRef.current = navigator;
    });

    useEffect(() => {
        async function fetchPost() {
            try {

                if (!user || !user._id)
                    throw new Error('User id required');

                const posts = await getPosts(user._id);
                setPosts(posts.data);

                if (navRef.current) {
                    navRef.current.gotoUserPosts(user);
                }

            } catch (error) {
                console.error(error);
                setPosts([]);
            }
        }

        fetchPost();

    }, [user]);

    return posts;
}
