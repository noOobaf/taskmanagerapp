import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { token, logout, user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/auth');
    };

    return (
        <nav className="navbar">
            <span className="navbar-title" onClick={() => navigate('/')}>Task Manager App</span>
            {token && (
                <div className="navbar-actions">
                    <button
                        className="profile-avatar-btn"
                        title="Profile"
                        onClick={() => navigate('/profile')}
                    >
                        <span className="profile-avatar-circle">
                            {(user?.name ? user.name[0] : user?.username ? user.username[0] : '?').toUpperCase()}
                        </span>
                    </button>
                    <button className="logout-btn" onClick={handleLogout}>Logout</button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
