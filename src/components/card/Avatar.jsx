import React from 'react';

function Avatar(props) {
    return (
        <div className="avatar">
            <img alt="avatar" src={props.user.avatarUrl} />
            <p>
                <span>{props.user.name}</span>
                <span className="date">{props.post.date}</span>
            </p>
        </div>
    );
}

export default Avatar;
