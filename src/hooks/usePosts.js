import React, { useContext, useEffect, useReducer, useState } from 'react';
import { addComment, addVotes } from '../data/post';
import { downVoteFunction, getPostFunction, upVoteFunction } from '../startup/startup';

export const PostData = React.createContext([]);
export const PostDispatch = React.createContext(null);

export const usePosts = () => {
    const [state, dispatch] = useReducer(postsReducer, []);

    useEffect(() => {
        async function fetchPostData() {
            try {
                const response = await fetch(getPostFunction);

                if (response.ok) {
                    let result = await response.json();
                    dispatch({ type: "INIT", posts: result.data });
                }
                else {
                    dispatch({ type: "INIT_FAILURE" });
                    console.debug('Failed to get posts', await response.text());
                }

            } catch (ex) {
                console.debug(ex.message, ex);
            }
        }

        fetchPostData();

    }, []);

    return [state, dispatch];
};

export const usePost = (postId) => {
    const posts = useContext(PostData);
    const dispatch = useContext(PostDispatch);
    const [post, setPost] = useState({});

    useEffect(() => {
        const post = posts.find(p => p._id === postId);
        setPost(post);
    }, [posts, postId]);

    return [post, (action) => postReducer(post, action, postId, dispatch)];
};

const postsReducer = (state, action) => {
    switch (action.type) {
        case 'INIT': {
            const posts = action.posts || [];
            return [...posts];
        }
        case 'ADD_POST': {
            return [...state, action.post];
        }
        case 'UPDATE_POST': {
            const { post } = action;

            if (!post || !post._id) {
                console.debug('new post is invalid', post);
                return state;
            }

            const selectedPost = state.find(p => p._id === post._id)

            if (!selectedPost) {
                console.debug('post not found', post, selectedPost);
                return state;
            }

            const index = state.indexOf(selectedPost);
            const updated = [...state];
            updated[index] = post;

            return updated;
        }

        case "INIT_FAILURE": {
            console.error('Failed to get posts from the server');
            return state;
        }

        default:
            console.error(`Invalid action on post: ${action.type}`);
            return state;
    }
};

const postReducer = async (state, action, postId, dispatch) => {
    switch (action.type) {
        case "INIT": {
            return action.post;
        }
        case "ADD_COMMENT": {
            return handleComment(state, action, postId, dispatch);
        }
        case "UP_VOTE": {
            return handleVote(state, action, upVoteFunction, dispatch);
        }
        case "DOWN_VOTE": {
            return handleVote(state, action, downVoteFunction, dispatch);
        }
        default: {
            console.debug(`Invalid post command: ${action}`);
            return state;
        }
    }
};

const handleComment = async (state, action, postId, dispatch) => {
    const { comment, user } = action;

    if (!comment) {
        console.debug('comment is required:', action);
        return state;
    }

    const result = await addComment(user, postId, comment);

    try {
        verify(result);
    } catch (ex) {
        console.error(ex);
        return state;
    }
    const post = result.data;

    dispatch({ type: "UPDATE_POST", post });

    return post;
};

const handleVote = async (state, action, url, dispatch) => {
    const { votes, user } = action;

    if (!votes) {
        console.debug('vote is required', action);
        return state;
    }

    const result = await addVotes(user, state, votes, url);

    try {
        verify(result);
    } catch (ex) {
        console.error(ex);
        return state;
    }

    const post = result.data;

    dispatch({ type: "UPDATE_POST", post });

    return upVoteFunction;
}


const verify = (result) => {
    if (result.errors || result.errorMessage) {
        console.debug('Failed to add post:', result);
        throw new Error();
    }
}
