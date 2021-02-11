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

    return {
        goBack,
        navigateTo
    };
};
