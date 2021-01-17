import React from 'react';

function Avatar(props) {
    const { date } = props.post;
    const { name, avatarUrl } = props.user;

    return (
        <div className="avatar">
            <img alt="user avatar" src={avatarUrl} />
            <p>
                <span>{name}</span>
                <span className="date">{date}</span>
            </p>
        </div>
    );
}

export default Avatar;
