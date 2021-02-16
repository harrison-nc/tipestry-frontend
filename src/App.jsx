import React, { useState } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';

import './assets/css/minireset.min.css';
import './assets/css/util.css';
import './assets/css/App.css';
import Home from './pages/home/Home';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Post from './pages/post/Post';
import NotFound from './pages/NotFound';
import Navbar from './components/navbar/Navbar';
import Search from './pages/Search';
import Detail from './pages/Detail';
import { Modals } from './modal/Modals';
import { usePosts, PostData, PostDispatch } from './hooks/usePosts.js';
import { defaultTags } from './data/post';
import { UserData, useUser } from './hooks/useUser';
import { loginUser } from './data/user';

export default function App() {
    const location = useLocation();
    const [posts, dispatch] = usePosts();
    const [user, userDispatch] = useUser();
    const [toptags] = useState(defaultTags);

    const background = location.state && location.state.background;

    const handleLogin = async (user) => {
        const result = await loginUser(user);

        if (result.errors || result.errorMessage) {
            return result;
        }

        userDispatch({ type: "LOGIN", user: result.data });
    };

    return (
        <PostData.Provider value={posts}>
            <PostDispatch.Provider value={dispatch}>
                <UserData.Provider value={user}>
                    <Navbar />
                    <main className="main is-flex flex-column pt-3 px-4">
                        <Switch location={background || location}>
                            <Route exact path="/" children={<Home toptags={toptags} />} />
                            <Route path="/register" children={<Register />} />
                            <Route path="/login" children={<Login onLogin={handleLogin} />} />
                            <Route path="/post" children={<Post />} />
                            <Route path="/search" children={<Search />} />
                            <Route path="/detail/:postId/:title" children={<Detail />} />
                            <Route children={<NotFound />} />
                        </Switch>
                        {background &&
                            <Modals toptags={toptags} onLogin={handleLogin} />
                        }
                    </main>
                </UserData.Provider>
            </PostDispatch.Provider>
        </PostData.Provider>
    );
}
