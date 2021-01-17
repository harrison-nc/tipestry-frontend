import Content from './card/Content.jsx';
import Footer from './card/Footer.jsx';
import Header from './card/Header.jsx';

function Card(props) {
    return (
        <div className="card">
            <Header
                post={props.post}
                user={props.user} />

            <Content
                description={props.post.description}
                resourceUrl={props.post.resourceUrl} />

            <Footer
                likes={props.post.likes}
                disLikes={props.post.disLikes}
                comments={props.post.comments}
                shares={props.post.shares}
                views={props.post.views} />
        </div>
    );
}

export default Card;
