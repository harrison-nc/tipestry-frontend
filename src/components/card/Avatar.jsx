import React from 'react';

const Avatar = (props) => {
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
