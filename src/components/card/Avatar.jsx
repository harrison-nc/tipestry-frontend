import React from 'react';

const Avatar = (props) => {
    const { post } = props;

    if (!post) return (<span>no avatar</span>);

    let { date, user } = post;

    if (!user) user = { name: 'no user', avatarUrl: '' };

    const { name, avatarUrl } = user;

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
