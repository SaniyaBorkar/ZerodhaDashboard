
import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [funds, setFunds] = useState(0);

  const [cookies, removeCookie] = useCookies([]);

  useEffect(() => {
    
    const verifyCookie = async () => {
      if (!cookies.token) {
        setIsAuthenticated(false);
      }
      const { data } = await axios.post(
        "http://localhost:3002",
        {},
        { withCredentials: true }
      );
      const { status, user, id, funds } = data;
      setUsername(user);
      setUserId(id);
      setFunds(funds);
      return status
        ? setIsAuthenticated(true)
        : (removeCookie("token"), setIsAuthenticated(false));
    };

    verifyCookie();
  }, [cookies, removeCookie]);

  const login = () => setIsAuthenticated(true);
  const logout = () => {
    setIsAuthenticated(false);
    removeCookie("token");
    setFunds(0);
    setUsername("");
    setUserId("");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, login, logout, cookies, userId, funds }}>
      {children}
    </AuthContext.Provider>
  );
};


