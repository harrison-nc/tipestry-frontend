import React, { useContext, useReducer } from "react";
import { loginUser } from "../data/user";

export const UserData = React.createContext({});
export const UserDispatch = React.createContext(null);

export const useUser = () => {
    return useReducer(userReducer, {});
};

export const useLogin = () => {
    const dispatch = useContext(UserDispatch);

    const login = async (user) => {
        const result = await loginUser(user);
        dispatch({ type: "LOGIN", user: result.data });
    };

    return login;
};

export const useLogout = () => {
    const dispatch = useContext(UserDispatch);

    const logout = () => {
        dispatch({ type: "LOGOUT" });
    };

    return logout;
};

const userReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN": {
            const { user } = action;
            const { name, email, token } = user || {};

            if (!user || !name || !email || !token) {
                return state;
            }

            return {
                name,
                email,
                token,
                loggedIn: true,
            }
        }
        case "LOGOUT": {
            return {
                name: "",
                loggedIn: false,
            }
        }
        default:
            return state;
    }
};
