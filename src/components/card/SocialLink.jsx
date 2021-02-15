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

    return (
        <div className={className} >
            <Button
                name="Like"
                value={upVotes}
                onClick={(e) => dispatch({
                    user: user,
                    type: "UP_VOTE",
                    votes: inc(upVotes)
                })} />

            <Button
                name="Dislike"
                value={downVotes}
                onClick={e => dispatch({
                    user: user,
                    type: "DOWN_VOTE",
                    votes: inc(downVotes)
                })} />

            <div>
                <Link className="btn comment py-5 px-5" to={commentLink}>
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
        <div>
            <Link to="/" className="btn action py-5 px-5" onClick={onClick}>
                {name}
            </Link>
            <span>{value}</span>
        </div>
    );
};
