import React from 'react';
import app from '../../firebase/firebase.config';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { createContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

const auth = getAuth(app);
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);

    // registration
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // login
    const login = (email, password) => {
        // setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    // logout
    const logout = () => {
        localStorage.removeItem('my-shop-token');
        setLoading(true);
        return signOut(auth);
    }

    // get signed in user
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        })
        return () => unsubscribe();
    }, []);

    const authInfo = {
        user,
        loading,
        createUser,
        login,
        logout,
        setLoading
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;