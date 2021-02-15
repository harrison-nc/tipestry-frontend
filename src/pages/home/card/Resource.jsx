import React from 'react';
import { useNavigator } from '../../../hooks/useNavigator';

export const Resource = ({ post }) => {
    const navigator = useNavigator();
    const { resourceUrl, _id: postId, title } = post;
    const style = { cursor: "pointer" };

    const handleClick = (e) => post && navigator.gotoPostDetail(postId, title);

    return (
        <div className="resource">
            <img
                style={style}
                width="72px"
                height="72px"
                src={resourceUrl}
                alt="resource"
                onClick={handleClick} />
        </div>
    );
};
