import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(null);
    const [improperLogout, setImproperLogout] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            if (token) {
                try {
                    const res = await api.get('/auth/me');
                    setUser(res.data);
                    localStorage.setItem('userInfo', JSON.stringify(res.data));
                } catch {
                    setUser(null);
                    localStorage.removeItem('userInfo');
                    setToken(null);
                    localStorage.removeItem('token');
                    setImproperLogout(true);
                }
            } else {
                setUser(null);
                localStorage.removeItem('userInfo');
            }
        };
        fetchUser();
    }, [token]);

    useEffect(() => {
        if (improperLogout) {
            toast.info('You did not logout correctly last time.');
            setImproperLogout(false);
        }
    }, [improperLogout]);

    const login = (token) => {
        setToken(token);
        localStorage.setItem('token', token);
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
        toast.success('Logged out successfully!');
    };

    return (
        <AuthContext.Provider value={{ token, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
