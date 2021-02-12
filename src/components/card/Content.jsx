import React from 'react';
import { useHistory } from 'react-router-dom';

export default function Content(props) {
    const history = useHistory();
    const { post } = props;
    const { resourceUrl } = post;

    function handleClick(e) {
        if (!post) return;

        const { _id: postId, title } = post;

        history.push(`/detail/${postId}/${title}`, { postId });
    }

    return (
        <figure className="resource">
            <img
                onClick={handleClick} alt="Resource"
                src={resourceUrl} />
        </figure>
    );
};
