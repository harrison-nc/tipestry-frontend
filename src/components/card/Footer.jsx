import React from 'react';
import SocialLinks from './SocialLinks';

export default function Footer({ post }) {
    return (
        <div className="footer px-3">
            <SocialLinks className="social" post={post} />
        </div>
    );
};
