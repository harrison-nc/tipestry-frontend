import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getComments, getPosts } from '../data/user';
import { Card } from '../components/Comment';
import Cards from '../components/card/Cards';
import Banner from '../components/Banner';
import Empty from '../components/Empty';

export default function UserContent() {
    const user = useLocationStateUser();
    const [posts, setPosts] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [comments, setComments] = useState([]);
    const [selectedPageIndex, setSelectedPageIndex] = useState(0);
    const pages = usePages(posts, comments);

    useEffect(() => {
        async function fetchContent() {
            try {
                const [posts, comments] = await getUserContent(user._id);
                setPosts(posts);
                setComments(comments);
                setLoaded(true);
            } catch (error) {
                console.error(error);
            }
        }

        fetchContent();
    }, [user]);

    const handlePageChange = (id) => setSelectedPageIndex(Number(id) || 0);
    const selectedPage = () => pages[selectedPageIndex || 0].render();

    return (
        <div className="user-content columns px-2">
            <Header
                user={user}
                links={pages}
                selected={selectedPageIndex}
                onPageChange={handlePageChange} />

            <div className="main rows">
                {loaded ? selectedPage() : <LandingPage />}
                <Banner className="user-content-banner" />
            </div>
        </div>
    );
}

const Header = ({ user, links, onPageChange, selected }) => {
    return (
        <div className="header columns">
            <div className="top rows py-4 px-4">
                <div className="userd columns">
                    <span>{user.name}</span>
                    <span className="email">{user.email}</span>
                </div>
                <img className="avatar" src={user.avatarUrl} alt="avatar" />
            </div>
            <Menu links={links} onClick={onPageChange} selected={selected} />
        </div>
    );
};

const Menu = ({ links, onClick, selected }) => {
    return (
        <div className="menu rows has-background-link px-3">
            {links.map((link, id) =>
                <MenuItem
                    key={id}
                    id={id}
                    text={link.name}
                    selected={selected}
                    onClick={onClick} />)
            }
        </div>
    );
};

const MenuItem = ({ id, text, selected, onClick }) => {
    return (
        <button
            id={id}
            onClick={(e) => onClick(id)}
            className={"btn has-text-white menu__item" + (selected === id ? " selected" : "")}>
            <span className="text">{text}</span>
            <span className="border"></span>
        </button>
    );
};

const Posts = ({ posts }) => {
    return (
        <div className="posts rows">
            {posts && posts.length > 0
                ? <Cards posts={posts} />
                : <Empty />
            }
        </div>
    );
};

const Comments = ({ comments }) => {
    return (
        <div className="comments columns">
            {comments && comments.length > 0
                ? comments.map((comment, key) => <Card key={key} comment={comment.value} />)
                : <Empty />
            }
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
            <h1>Getting user content!</h1>
            <p>Please wait<span ref={waiting}></span></p>
        </div>
    );
};

const usePages = (posts, comments) => {
    return [
        {
            name: "posts",
            render() {
                return <Posts posts={posts} />
            },
        },
        {
            name: "comments",
            render() {
                return <Comments comments={comments} />
            }
        }
    ]
}

function useLocationStateUser() {
    const [user, setUser] = useState({});
    const location = useLocation();
    const userRef = useRef();

    useEffect(() => {
        userRef.current = user;
    }, [user]);

    useEffect(() => {
        const user = location.state && location.state.user;
        const { current } = userRef;

        if (current && current._id === user._id) {
            return;
        }

        setUser(user);
    }, [location]);

    return user;
}

const getUserContent = async (userId) => {
    try {
        const posts = await new Promise(async (resolve, reject) => {
            try {
                const content = await getPosts(userId);
                resolve(content.data);
            } catch (error) {
                reject(error);
            }
        });
        const comments = await new Promise(async (resolve, reject) => {
            try {
                const content = await getComments(userId);
                resolve(content.data);
            } catch (error) {
                reject(error);
            }
        });
        return [posts, comments];

    } catch (error) {
        console.error(error);
    }

    return [[], []];
}
