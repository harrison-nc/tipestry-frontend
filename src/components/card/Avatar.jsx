import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate, formatDateString } from '../../util/date-util';

export default function Avatar(props) {
    const { post } = props;

    if (!post) return (<span>no avatar</span>);

    let { createdAt, user } = post;

    if (!user) user = { name: 'no user', avatarUrl: '' };

    const { name, avatarUrl } = user;
    const ucLink = { pathname: '/uc', state: { user: user } };

    return (
        <div className="avatar">
            <img alt="user" src={avatarUrl} />
            <div>
                <Link to={ucLink}>
                    <span className="has-text-link">@{name}</span>
                </Link>
                <p>
                    <abbr className="date has-text-grey"
                        title={formatDateString(createdAt)}>
                        {formatDate(createdAt)}
                    </abbr>
                </p>
            </div>
        </div>
    );
};
