import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState(
        localStorage.getItem("token")
    );

    const getRole = () => {
        if (!token) return null;

        try {
            const payload = JSON.parse(
                atob(token.split(".")[1])
            );

            return (
                payload.role ||
                payload[
                "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
                ]
            );
        } catch {
            return null;
        }
    };

    const login = (jwt) => {
        localStorage.setItem("token", jwt);
        setToken(jwt);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
    };

    const role = getRole();

    return (
        <AuthContext.Provider
            value={{
                token,
                login,
                logout,
                role,
                isAuthenticated: !!token,
                isAdmin: role === "ADMIN",
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}