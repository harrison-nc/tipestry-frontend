import React from 'react';
import { useNavigator } from '../../hooks/useNavigator';

export default function Content(props) {
    const navigator = useNavigator();
    const { post } = props;
    const { resourceUrl } = post;

    function handleClick(e) {
        if (!post) return;

        const { _id: postId, title } = post;

        navigator.gotoPostDetail(postId, title);
    }

    return (
        <figure className="resource">
            <img
                onClick={handleClick} alt="Resource"
                src={resourceUrl} />
        </figure>
    );
};
