import React from 'react';
import { Link } from 'react-router-dom';
import banner from '../../assets/images/potw-banner.png';

export const Hashtags = (props) => {
    const { toptags } = props;

    return (
        <div className="home__right">
            <div className="home__right__content is-sticky">
                <div className="sidebar is-flex flex-column">
                    <div>
                        <p className="mb-5 title">Top Hashtags</p>
                        <div className="has-background-white box banner-container is-flex flex-column">
                            <p className="py-4 px-3 is-flex flex-wrap">
                                {toptags.map((tag, id) => <a className="tag" href="/" key={id}>{tag}</a>)}
                            </p>
                            <img width="100%" alt="Tipestry post of the week event"
                                src={banner} />
                        </div>
                    </div>

                    <div className="policy box has-background-white py-3 px-3 is-flex flex-column">
                        <p>
                            <strong className="emphasis">© 2021 <em>Tipestry</em></strong> Faq Contact About Contests Privacy Policy
                        Tipestry Go White Paper Tipestry for Chrome Terms and Condition
                        </p>
                        <div>
                            <p>Follow Us on Social Media</p>
                            <div className="social pt-5 is-flex">
                                <SocialLink>Facebook</SocialLink>
                                <SocialLink>Twiter</SocialLink>
                                <SocialLink>Youtube</SocialLink>
                                <SocialLink>Telegram</SocialLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const SocialLink = ({ children }) => {
    function handleClick(e) {
        e.preventDefault();
    }

    return (<p><Link className="link" to="/" onClick={handleClick}>{children}</Link></p>);
}
