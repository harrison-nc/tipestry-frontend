import React, { useReducer } from "react";

export const UserData = React.createContext({});
export const UserDispatch = React.createContext(null);

export const useUser = () => {
    return useReducer(userReducer, {});
};

const userReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN": {
            const [name, email, token] = action;

            if (!name || !email || !token) {
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
                name: "guest",
                loggedIn: false,
            }
        }
        default:
            console.debug('Invalid command', action);
            return state;
    }
};
