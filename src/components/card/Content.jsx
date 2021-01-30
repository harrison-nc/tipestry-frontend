import React from 'react';
import { useHistory } from 'react-router-dom';

export default function Content(props) {
    const history = useHistory();
    const { post } = props;
    const { resourceUrl, description } = post;

    function handleClick(e) {
        if (!post) return;

        const { _id: postId, title } = post;

        const state = JSON.stringify(post);

        history.push(`/detail/${postId}/${title}`, { post: state });
    }

    return (
        <div className="resource">
            <figure>
                <img onClick={handleClick} alt="Resource" src={resourceUrl} />
                <figcaption>{description}</figcaption>
            </figure>
        </div>
    );
};
