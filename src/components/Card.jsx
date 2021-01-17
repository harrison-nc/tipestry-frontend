import Content from "./card/Content.jsx";
import Footer from "./card/Footer.jsx";
import Header from "./card/Header.jsx";

function Card(props) {
    const { post } = props;
    const { user } = props;

    const {
        description,
        resourceUrl,
        likes,
        disLikes,
        comments,
        shares,
        views,
    } = props;

    return (
        <div className="card">
            <Header post={post} user={user} />

            <Content description={description} resourceUrl={resourceUrl} />

            <Footer
                likes={likes}
                disLikes={disLikes}
                comments={comments}
                shares={shares}
                views={views}
            />
        </div>
    );
}

export default Card;
