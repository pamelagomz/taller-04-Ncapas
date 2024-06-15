import React, {useState, useEffect} from "react";
import axios from "axios";
import {toast} from "sonner";

const TOKEN_KEY = "neigh_secure_token";
const AuthContext = React.createContext({} as AuthContextProviderProps);

export interface AuthContextProviderProps {
    token: string | null;
    user: User | null;
    login: (email: string, password: string) => Promise<boolean>;
    register: (name: string, email: string, password: string) => Promise<boolean>;
    logout: () => void;
}

export const AuthContextProvider = (props) => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const _token = getTokenLS();

        if (_token) {
            setToken(_token);
        }
    }, []);

    useEffect(() => {
        const fetchUserInfo = async () => {
            if (!token) {
                return;
            }

            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

            try {
                const {data} = await axios.get<User>("/auth/whoami");
                setUser(data);
            } catch (error) {
                logout();
            }
        };

        fetchUserInfo();
    }, [token]);

    const login = async (email: string, password: string) : Promise<boolean> => {
        try {
            const { data } = await axios.post("/auth/login", {email, password});
            const _token = data.data.token;

            setToken(_token);
            setTokenLS(_token);

            toast.success("Inicio de sesión exitoso");
            return true;
        } catch (error) {
          // let status = "500"; // Default status
          // if (axios.isAxiosError(error)) {
          //   status = error.response?.status.toString() || "500";
          // }
          // const msgs = {
          //   "404": "User not found",
          //   "409": "Email already in use",
          //   "400": "Email o contraseña incorrectos",
          //   "500": "Unexpected error"
          // };
          // toast.error(msgs[status as "404" | "400" | "500" | "409"]);
          return false;
        }
    }

    const register = async (name: string, email: string, password: string) : Promise<boolean> => {
        try {
            const response = await axios.post("/auth/register", {name, email, password});
            if (response.status === 201) {
                toast.success("Signup successful");
                return true;
            }
        } catch (error) {
            // console.log(error);
            // let status = "500"; // Default status
            // if (axios.isAxiosError(error)) {
            //     status = error.response?.status.toString() || "500";
            // }
            // const msgs = {
            //     "404": "User not found",
            //     "409": "Email already in use",
            //     "400": "Email o contraseña incorrectos",
            //     "500": "Unexpected error"
            // };
            toast.error(msgs[status as "404" | "400" | "500" | "409"]);
        }
        return false;
    }


    const logout = () => {
        removeTokenLS();
        setToken(null);
        setUser(null);
        window.location.href = "https://localhost:5173/";
    };

    const state: AuthContextProviderProps = {
        token,
        user,
        login,
        register,
        logout,
    };

    return <AuthContext.Provider value={state} {...props} />;
};

export const useAuthContext = () => {
    const context = React.useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useUserContext must be call inside of a UserContextProvider component"
        );
    }

    return context;
};

const setTokenLS = (token: string) => localStorage.setItem(TOKEN_KEY, token);
const getTokenLS = () => localStorage.getItem(TOKEN_KEY);
const removeTokenLS = () => localStorage.removeItem(TOKEN_KEY);
