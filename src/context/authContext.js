import { useState, createContext, useContext, useEffect } from "react";
import { addToLocalStorage } from "../utils";
import { getFromLocalStorage, removeFromLocalStorage } from "../utils";
const AuthContext = createContext("");
export const useAuth = () => {
  return useContext(AuthContext);
};
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const logout = () => {
    removeFromLocalStorage();
    setUser(null);
  };
  const setCurrentUser = (user) => {
    setUser(user);
    addToLocalStorage(user);
  };

  useEffect(() => {
    if (getFromLocalStorage) {
      setUser(getFromLocalStorage);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setCurrentUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
