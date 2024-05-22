import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const register = (username, email, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = users.find((user) => user.username === username || user.email === email);

    if (existingUser) {
      return false;
    }

    const newUser = { username, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
    return true;
  };

  const login = (username, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find((user) => user.username === username && user.password === password);

    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      return true;
    }

    return false;
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
