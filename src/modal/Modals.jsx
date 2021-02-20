import React from 'react';
import Modal from './Modal';
import Register from '../pages/register/Register';
import Login from '../pages/login/Login';
import Post from '../pages/post/Post';
import Comment from '../components/Comment';
import { Switch, Route } from 'react-router-dom';
import { BannerModal } from '../pages/home/Sidebar';

export const Modals = () => {
    return (
        <Switch>
            <Route path="/register" children={<Modal component={Register} />} />
            <Route path="/login" children={<Modal component={Login} />} />
            <Route path="/post" children={<Modal component={Post} />} />
            <Route path="/banner" children={<Modal component={BannerModal} />} />

            <Route path="/comment/:postId">
                <Modal>
                    <Comment
                        className="comment box is-flex flex-column has-background-white py-3 px-2"
                        id="comment"
                        isModal={true} />
                </Modal>
            </Route>
        </Switch>
    );
};
