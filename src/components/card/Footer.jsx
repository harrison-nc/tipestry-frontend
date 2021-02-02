import React from 'react';
import SocialLinks from './SocialLink';

export default function Footer({ post, onAction }) {
    return (
        <div className="footer px-3">
            <SocialLinks className="social" post={post} onAction={onAction} />
        </div>
    );
};
