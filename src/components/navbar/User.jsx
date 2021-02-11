import React from 'react';

export const User = ({ user }) => {
    return <span className="name has-text-white">@{user.name}</span>
};
