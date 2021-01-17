import Content from "./card/Content";
import Footer from "./card/Footer";
import Header from "./card/Header";

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
    } = post;

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
