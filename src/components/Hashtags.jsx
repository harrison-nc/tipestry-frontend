
import banner from '../images/potw-banner.png';

const Hashtags = (props) => {
    const { toptags } = props;

    return (
        <div className="aside container right">
            <div className="aside-content">
                <div className="aside-fixed is-flex flex-column">
                    <div>
                        <p>Top Hashtags</p>
                        <div className="has-background-white box banner-container is-flex flex-column">
                            <p className="py-4 px-3 is-flex flex-wrap">
                                {toptags.map((tag, id) => <a className="tag" href="/" key={id}>{tag}</a>)}
                            </p>
                            <img width="300" alt="Tipestry post of the week event"
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
                                <p><a className="link" href="/">Facebook</a></p>
                                <p><a className="link" href="/">Twiter</a></p>
                                <p><a className="link" href="/">Youtube</a></p>
                                <p><a className="link" href="/">Telegram</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hashtags;
