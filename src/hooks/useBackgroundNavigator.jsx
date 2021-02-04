import { useHistory, useLocation } from 'react-router-dom';

export const useBackgroundNavigator = (isModal) => {
    const history = useHistory();
    const location = useLocation();
    const background = location.state && location.state.background;

    const back = async (e) => {
        if (isModal && background)
            history.replace(background.pathname, background.state);
        else
            history.goBack();
    };

    return {
        navigate: back,
    };
};
