import React from 'react';
import { Link } from 'react-router-dom';
import Banner from '../../components/Banner';
import { useNavigator } from '../../hooks/useNavigator';
import { useTopTags } from '../../hooks/usePosts';

export const Sidebar = () => {
    const toptags = useTopTags();

    return (
        <div className="home__right">
            <div className="home__right__content is-sticky">
                <div className="sidebar columns">
                    <div>
                        <p className="mb-5 title">Top Hashtags</p>
                        <div className="has-background-white box columns">
                            <p className="py-4 px-3 rows flex-wrap">
                                {toptags && toptags.map((tag, id) =>
                                    <a className="tag" href="/" key={id}>#{tag}</a>
                                )}
                            </p>
                            <Banner className="banner__container" />
                        </div>
                    </div>

                    <div className="policy box has-background-white py-3 px-3 columns">
                        <p>
                            <strong className="emphasis">© 2021 <em>Tipestry</em></strong> Faq Contact About Contests Privacy Policy
                        Tipestry Go White Paper Tipestry for Chrome Terms and Condition
                        </p>
                        <div>
                            <p>Follow Us on Social Media</p>
                            <div className="social pt-5 rows">
                                <FollowLink>Facebook</FollowLink>
                                <FollowLink>Twiter</FollowLink>
                                <FollowLink>Youtube</FollowLink>
                                <FollowLink>Telegram</FollowLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const FollowLink = ({ children }) => {
    function handleClick(e) {
        e.preventDefault();
    }

    return (<p><Link className="link" to="/" onClick={handleClick}>{children}</Link></p>);
}

export const BannerModal = () => {
    const navigator = useNavigator();

    function handleClose(event) {
        navigator.goBack();
    }

    return (
        <div className="home__modal columns has-background-white">
            <div className="header rows px-3">
                <h1 className="title">Side Bar</h1>
            </div>
            <div className="content columns px-2">
                <Sidebar isModal={true} />
                <div className="control rows">
                    <button className="btn" onClick={handleClose}>Close</button>
                </div>
            </div>
        </div>
    );
};
