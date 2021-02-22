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
import { UserData, UserDispatch, useUser } from './hooks/useUser';
import UserContent from './pages/UserContent';

export const ListViewContext = React.createContext(false);
export const ListViewDispatchContext = React.createContext();

export default function App() {
    const location = useLocation();
    const background = location.state && location.state.background;

    return (
        <Providers>
            <Navbar />
            <main className="main columns pt-3 px-4">
                <Switch location={background || location}>
                    <Route exact path="/" component={Home} />
                    <Route path="/register" component={Register} />
                    <Route path="/login" component={Login} />
                    <Route path="/post" component={Post} />
                    <Route path="/search" component={Search} />
                    <Route path="/detail/:postId/:title" component={Detail} />
                    <Route path="/uc" component={UserContent} />
                    <Route children={<NotFound />} />
                </Switch>
                {background && <Modals />}
            </main>
        </Providers>
    );
}

const Providers = ({ children }) => {
    const [posts, postDispatch] = usePosts();
    const [user, userDispatch] = useUser();
    const [listView, setListView] = useState(false)

    return (
        <PostData.Provider value={posts}>
            <PostDispatch.Provider value={postDispatch}>
                <UserData.Provider value={user}>
                    <UserDispatch.Provider value={userDispatch}>
                        <ListViewContext.Provider value={listView}>
                            <ListViewDispatchContext.Provider value={setListView}>
                                {children}
                            </ListViewDispatchContext.Provider>
                        </ListViewContext.Provider>
                    </UserDispatch.Provider>
                </UserData.Provider>
            </PostDispatch.Provider>
        </PostData.Provider>
    );
};
