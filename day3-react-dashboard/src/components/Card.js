import React from 'react';

/**
 * Card Component - Displays a metric card
 * Props:
 * - title: Card title
 * - value: Main value to display
 * - icon: Emoji or icon
 * - trend: Percentage change (optional)
 * - color: Border/icon color
 */
const Card = ({ title, value, icon, trend, color }) => {
    return (
        <div className="dashboard-card" style={{ borderLeftColor: color }}>
            <div className="card-icon" style={{ color }}>
                {icon}
            </div>
            <div className="card-content">
                <h3 className="card-title">{title}</h3>
                <p className="card-value">{value}</p>
                {trend && (
                    <span className={`card-trend ${trend > 0 ? 'positive' : 'negative'}`}>
                        {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
                    </span>
                )}
            </div>
        </div>
    );
};

export default Card;
