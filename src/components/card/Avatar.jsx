import React from 'react';

const Avatar = (props) => {
    const { date } = props.post;
    const { name, avatarUrl } = props.user;

    return (
        <div className="avatar">
            <img alt="user avatar" src={avatarUrl} />
            <div>
                <p><span>{name}</span></p>
                <p><span className="date">{date}</span></p>
            </div>
        </div>
    );
}

export default Avatar;
