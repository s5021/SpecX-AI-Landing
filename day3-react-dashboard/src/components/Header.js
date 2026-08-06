import React from 'react';

/**
 * Header Component
 * Props:
 * - title: Dashboard title
 * - userName: Current user's name
 * - onLogout: Logout button click handler
 */
const Header = ({ title, userName, onLogout }) => {
    return (
        <header className="dashboard-header">
            <div className="header-left">
                <h1>{title}</h1>
            </div>
            <div className="header-right">
                <span className="user-name">👤 Welcome, {userName}</span>
                <button onClick={onLogout} className="btn btn-logout">
                    Logout
                </button>
            </div>
        </header>
    );
};

export default Header;
