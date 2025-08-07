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
   const refreshUser = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("user"))?.token;
      const res = await axios.get("/api/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data) {
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
      }
    } catch (err) {
      console.error("Failed to refresh user", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout,refreshUser  }}>
      {children}
    </AuthContext.Provider>
  );
};
