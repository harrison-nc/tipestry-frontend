import React from 'react';
import { formatDate, formatDateString } from '../../util/date-util';

export default function Avatar(props) {
    const { post } = props;

    if (!post) return (<span>no avatar</span>);

    let { createdAt, user } = post;

    if (!user) user = { name: 'no user', avatarUrl: '' };

    const { name, avatarUrl } = user;

    return (
        <div className="avatar">
            <img alt="user" src={avatarUrl} />
            <div>
                <p><span className="has-text-link">@{name}</span></p>
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
