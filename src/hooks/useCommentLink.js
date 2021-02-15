import { useLocation } from 'react-router-dom';

export function useCommentLink(postId) {
    const location = useLocation();

    return {
        pathname: `/comment/${postId}`,
        state: { background: location }
    };
}
