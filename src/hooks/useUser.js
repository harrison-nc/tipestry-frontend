import React, { useReducer } from "react";
import { loginUser } from "../data/user";

export const UserData = React.createContext({});
export const UserDispatch = React.createContext(null);

export const useUser = () => {
    const [state, dispatch] = useReducer(userReducer, {});

    const login = async (user) => {
        const result = await loginUser(user);
        dispatch({ type: "LOGIN", user: result.data });
    };

    const logout = () => {
        dispatch({ type: "LOGOUT" });
    };

    return [state, dispatch, login, logout];
};

const userReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN": {
            const { user } = action;
            const { name, email, token } = user || {};

            if (!user || !name || !email || !token) {
                console.debug('Invalid user', action);
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
            console.debug('Invalid command', action);
            return state;
    }
};
