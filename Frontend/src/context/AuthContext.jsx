// context/AuthContext.js
import { createContext, useState, useEffect } from "react";
import { getProfile } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const res = await getProfile();
        setUser(res.data.user);
      } catch (err) {
        console.error("Profile fetch error:", err);
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  const login = async (token) => {
    localStorage.setItem("token", token);
    try {
      const res = await getProfile();
      setUser(res.data.user);
    } catch (err) {
      console.error("Login profile fetch failed");
    }
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
