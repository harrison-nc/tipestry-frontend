import React from 'react';
import Modal from './Modal';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Post from '../pages/Post';
import Comment from '../components/Comment';
import { Switch, Route } from 'react-router-dom';
import { BannerModal } from '../pages/home/Banner';

export const Modals = ({ onLogin, onPost, onComment, toptags }) => {
    return (
        <Switch>
            <Route path="/register">
                <Modal>
                    <Register isModal={true} />
                </Modal>
            </Route>

            <Route path="/login">
                <Modal>
                    <Login isModal={true} onLogin={onLogin} />
                </Modal>
            </Route>

            <Route path="/post">
                <Modal>
                    <Post isModal={true} onPost={onPost} />
                </Modal>
            </Route>

            <Route path="/banner">
                <Modal>
                    <BannerModal toptags={toptags} />
                </Modal>
            </Route>

            <Route path="/comment/:postId">
                <Modal>
                    <Comment
                        className="comment box is-flex flex-column has-background-white py-3 px-2"
                        id="comment"
                        isModal={true}
                        onSend={onComment} />
                </Modal>
            </Route>
        </Switch>
    );
};
