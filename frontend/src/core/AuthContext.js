import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(Cookies.get("accessToken") || null);
    const login = (accessToken, refreshToken) => {
        Cookies.set("accessToken", accessToken);
        if (refreshToken) Cookies.set("refreshToken", refreshToken);
        setToken(accessToken);
    };

    const logout = () => {
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
