import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, register } from '../services/api';
import { AuthContext } from '../context/AuthContext';

const Auth = () => {
    const { login: doLogin } = useContext(AuthContext);
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [contact_number, setContactNumber] = useState('');
    const [email, setEmail] = useState('');
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (isLogin) {
                const res = await login(identifier, password);
                doLogin(res.data.token);
                toast.success('Login successful!');
                navigate('/');
            } else {
                await register(username, password, name, contact_number, email);
                setIsLogin(true);
                toast.success('Signup successful! Please login.');
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Invalid credentials');
            toast.error('Failed to ' + (isLogin ? 'login' : 'signup'));
        }
    };

    return (
        <div className="auth-container auth-beautiful">
            <h2 className="auth-title">{isLogin ? 'Login' : 'Register'}</h2>
            <form className="auth-form" onSubmit={handleSubmit}>
                {isLogin ? (
                    <>
                        <input
                            className="auth-input"
                            type="text"
                            placeholder="Username / Email / Contact"
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            required
                        />
                        <input
                            className="auth-input"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </>
                ) : (
                    <>
                        <input
                            className="auth-input"
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <input
                            className="auth-input"
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <input
                            className="auth-input"
                            type="text"
                            placeholder="Contact Number"
                            value={contact_number}
                            onChange={(e) => setContactNumber(e.target.value)}
                            required
                        />
                        <input
                            className="auth-input"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            className="auth-input"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </>
                )}
                <button className="auth-btn" type="submit">{isLogin ? 'Login' : 'Register'}</button>
            </form>
            <button className="toggle-btn auth-toggle-btn" onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
            </button>
            {error && <div className="error auth-error">{error}</div>}
        </div>
    );
};

export default Auth;
