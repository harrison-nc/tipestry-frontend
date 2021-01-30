import { Link, useLocation } from 'react-router-dom';

export default function SocialLinks(props) {
    const location = useLocation();
    const { post, onAction, ...rest } = props;
    const { _id, upVotes, downVotes, comments, shares } = post;
    const postId = _id;

    const commentLink = {
        pathname: `/comment/${postId}`,
        state: { background: location }
    };

    return (
        <div {...rest} >
            <Button postId={postId}
                name="Like"
                value={upVotes}
                onClick={onAction} />

            <Button postId={postId}
                name="Dislike"
                value={downVotes}
                onClick={onAction} />

            <div>
                <Link className="btn comment py-5 px-5" to={commentLink}>
                    Comment
                </Link>
                {comments && <span>{comments.length}</span>}
            </div>

            <Button postId={postId}
                name="Share"
                value={shares && shares.length}
                onClick={onAction} />
        </div>
    );
}

export const Button = (props) => {
    const { postId, name, value, onClick } = props;

    function handleClick(e) {
        e.preventDefault();

        try {
            let newValue = Number(value);
            newValue++;
            e.target.name = name;
            e.target.value = newValue;
            e.target.postId = postId;
            onClick(e)
        }
        catch (ex) {
            console.error(ex);
        }
    }

    return (
        <div>
            <Link to="/" className="btn action py-5 px-5" onClick={handleClick}>
                {name}
            </Link>
            <span>{value}</span>
        </div>
    );
};
