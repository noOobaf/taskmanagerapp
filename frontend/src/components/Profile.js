import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    if (!user) return null;

    return (
        <div className="profile-page-container">
            <div className="profile-card">
                <div className="profile-avatar-large">
                    {(user.name ? user.name[0] : user.username[0]).toUpperCase()}
                </div>
                <h3 className="profile-name">{user.name || 'User'}</h3>
                <div className="profile-info-list">
                    <div><span className="profile-label">Username:</span> {user.username}</div>
                    <div><span className="profile-label">Email:</span> {user.email}</div>
                    <div><span className="profile-label">Contact:</span> {user.contact_number}</div>
                </div>
                <div className="profile-actions">
                    <button className="back-to-tasks-btn" onClick={() => navigate('/')}>← Back to Tasks</button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
