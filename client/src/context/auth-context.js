import { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem("authToken");
    return !!token;
  });

  const [user, setUser] = useState(() => {
    const userData = localStorage.getItem("authUser");
    return userData ? JSON.parse(userData) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("authToken") || null;
  });

  const login = ({ user, token }) => {
    setIsAuthenticated(true);
    setUser(user);
    setToken(token);

    localStorage.setItem("authToken", token);
    localStorage.setItem("authUser", JSON.stringify(user));
    navigate("/gear-organizer");
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setToken(null);

    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, token, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
