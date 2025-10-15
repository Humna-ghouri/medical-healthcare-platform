import React, { createContext, useState, useContext, useEffect } from 'react';
import { createUser, getUser, updateUser } from '../services/api';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../firebase';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userData = await getUser(user.uid);
        setUser({ ...user, ...userData });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signup = async (email, password, userData) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const { user } = userCredential;
    await createUser(user.uid, { email, ...userData });
    const newUser = await getUser(user.uid);
    setUser(newUser)
    return newUser;
  };

  const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const { user } = userCredential;
    const userData = await getUser(user.uid);
    setUser({ ...user, ...userData });
    return { ...user, ...userData };
  };

  const logout = () => {
    return signOut(auth);
  };

  const updateProfile = async (userData) => {
    if (user) {
      await updateUser(user.uid, userData);
      const updatedUser = await getUser(user.uid);
      setUser(updatedUser);
      return updatedUser;
    }
  };

  const value = {
    user,
    loading,
    signup,
    login,
    logout,
    updateProfile,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};