
import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider, 
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import axios from "axios";
import { auth } from "../firebase/firebase.config"; 

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const updateUserProfile = async (name, photURL) => {
    if (!auth.currentUser) return;
    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photURL,
    });
    setUser({ ...auth.currentUser });
  }

  const logOut = () => {
    setLoading(true);
    localStorage.removeItem('access-token');
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

      if (currentUser?.email) {
        const loggedUser = { email: currentUser.email };
        try {
          await axios.post(`${API_URL}/jwt`, loggedUser, {
            withCredentials: true,
          });
        } catch (error) {
          console.error("JWT Issue:", error);
        } finally {
          setLoading(false);
        }
      } else {
        try {
          await axios.post(`${API_URL}/logout`, {}, {
            withCredentials: true,
          });
        } catch (error) {
          console.error("Logout JWT Issue:", error);
        }
        finally {
          setLoading(false);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    signInWithGoogle,
    updateUserProfile,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
    

