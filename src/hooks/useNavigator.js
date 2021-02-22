import { useHistory, useLocation } from 'react-router-dom';

export const useNavigator = (isModal) => {
    const history = useHistory();
    const location = useLocation();
    const background = location.state && location.state.background;

    const goBack = async (e) => {
        if (isModal && background)
            history.replace(background.pathname, background.state);
        else
            history.goBack();
    };

    const navigateTo = (path, state) => {
        history.push(path, state);
    };

    const gotoPostDetail = (postId, title) => {
        history.push(`/detail/${postId}/${title}`, { postId });
    };

    const gotoUserPosts = (user) => {
        history.push('/uc/posts', { user });
    };

    const gotoHome = () => {
        history.push('/');
    };

    return {
        goBack,
        navigateTo,
        gotoPostDetail,
        gotoUserPosts,
        gotoHome,
    };
};
