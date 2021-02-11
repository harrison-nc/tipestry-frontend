import { useLocation } from 'react-router-dom';

export const useLinks = () => {
    const location = useLocation();
    const state = { background: location };
    return {
        post: {
            pathname: '/post',
            state,
        },
        login: {
            pathname: '/login',
            state,
        },
        register: {
            pathname: '/register',
            state,
        }
    };
};
