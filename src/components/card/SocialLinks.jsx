import { Link } from 'react-router-dom';
import { useCommentLink } from '../../hooks/useCommentLink.js';
import { usePost } from '../../hooks/usePosts';
import { useUser } from '../../hooks/useUser.js';

export default function SocialLinks({ post, className }) {
    const { upVotes, downVotes, comments, shares, _id: postId } = post;
    const commentLink = useCommentLink(postId);
    const dispatch = usePost(postId)[1];
    const [user] = useUser();
    const inc = (value) => Number(value) + 1;

    const handleLike = () => {
        dispatch({
            user: user,
            type: "UP_VOTE",
            votes: inc(upVotes)
        });
    }

    const handleDislike = () => {
        dispatch({
            user: user,
            type: "DOWN_VOTE",
            votes: inc(downVotes)
        });
    }

    return (
        <div className={className} >
            <Button
                name="Like"
                value={upVotes}
                onClick={handleLike} />

            <Button
                name="Dislike"
                value={downVotes}
                onClick={handleDislike} />

            <div className="comment__container is-flex">
                <Link className="btn py-5 px-5" to={commentLink}>
                    Comment
                </Link>
                {comments && <span>{comments.length}</span>}
            </div>

            <Button postId={postId}
                name="Share"
                value={shares && shares.length} />
        </div>
    );
}

export const Button = ({ onClick, name, value }) => {
    return (
        <div className="btn__control is-flex">
            <button className="btn action" onClick={onClick}>
                {name}
            </button>
            <span>{value}</span>
        </div>
    );
};
