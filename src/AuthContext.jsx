import { createContext, useContext, useState, useEffect } from "react";
import { message } from "antd";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("authToken") || null
  );
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (authToken) {
      localStorage.setItem("authToken", authToken);
    } else {
      localStorage.removeItem("authToken");
    }
  }, [authToken]);

  const login = (token) => {
    setAuthToken(token);
    message.success("Login successful!");
  };

  const logout = () => {
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem("authToken");
    message.success("Logged out successfully!");
  };

  return (
    <AuthContext.Provider value={{ authToken, user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to use the Auth Context
export const useAuth = () => useContext(AuthContext);
